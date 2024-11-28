const _ = require('lodash');
const videoModel = require('../../models/video');
const mainModel = require('../../models/playlet');
const responseUtils = require('../../utils/response');
const episodeModel = require('../../models/episode');
const coinModel = require('../../models/coin');
const userModel = require('../../models/user');
const paramUtils = require('../../utils/param');

async function getPlayletDetail(req, res, next) {
  const playlet_id = parseInt(req.query.playlet_id, 10);
  const video_id = parseInt(req.query.video_id || '', 10);
  if (playlet_id < 1) {
    return next('params error');
  }
  const playlet = await mainModel.find(playlet_id);
  if (!playlet) {
    return next('playet not exist');
  }
  const isLogin = !!res.user;
  const playletIds = [playlet_id];
  const videoFields = ['id', 'free', 'num', 'title', 'playlet_id', 'link'];
  let videos = await videoModel.getModel()
    .where({ is_delete: 0 })
    .whereIn('playlet_id', playletIds).select(...videoFields);
  if (!isLogin) {
    videos = videos.map((item) => ({
      ...item,
      link: item.free ? item.link : '',
    }));
  } else {
    const episodes = await episodeModel.getModel().where({ user_id: res.user.id }).select('video_id');
    const videoIds = episodes.map((x) => x.video_id);
    videos = videos.map((item) => ({
      ...item,
      link: (!item.free && !(videoIds.includes(item.id))) ? '' : item.link,
    }));
  }
  let video = videos.find((x) => x.id === video_id);
  if (!video) {
    video = videos.length > 0 ? videos[0] : {};
  }
  const groupFn = (v) => Math.floor(v.num / 30);
  const groupedVideosMap = _.groupBy(_.orderBy(videos, ['num'], ['asc']), groupFn);
  const keys = Object.keys(groupedVideosMap);
  keys.sort();
  let tabId = -1;
  const groupedVideos = keys.map((key) => {
    const items = groupedVideosMap[key];
    const first = items[0];
    const last = items[items.length - 1];
    if (tabId < 0) {
      const current = items.find((x) => x.id === video.id);
      if (current) {
        tabId = parseInt(key, 10);
      }
    }
    return {
      label: `${first.num}-${last.num}`,
      videos: items,
    };
  });
  responseUtils.success(res, {
    ...playlet,
    episodes: videos.length,
    videos: groupedVideos,
    video,
    videoId: video.id,
    tabId,
  });
}

async function unlockVideo(req, res, next) {
  const video_id = paramUtils.getInteger(req.body, 'video_id', 0);
  if (!video_id) {
    return next('params error');
  }
  const video = await videoModel.find(video_id);
  if (!video) {
    return next('video not exist');
  }
  const playlet = await mainModel.find(video.playlet_id);
  if (!playlet) {
    return next('playlet not exist');
  }
  const user = await userModel.find(res.user.id);
  if (user.balance < playlet.price) {
    return next('balance insufficient');
  }
  const episodeItem = await episodeModel.getModel().where({ user_id: res.user.id, video_id }).select('*').first();
  if (episodeItem) {
    return responseUtils.success(res, {
      link: video.link,
    });
  }
  await episodeModel.create({ user_id: res.user.id, video_id });
  const before_total = user.balance;
  const after_total = user.balance - playlet.price;
  await userModel.getModel().where({ id: res.user.id }).update({ balance: after_total });
  await coinModel.create({
    user_id: res.user.id,
    before_total,
    after_total,
    type: 1,
    coins: playlet.price,
    reason: `videoId: ${video_id}`,
  });
  responseUtils.success(res, {
    link: video.link,
  });
}

module.exports = {
  getPlayletDetail,
  unlockVideo,
};
