/**
 * 用法：
 * 回到项目根目录，然后执行：node ./scripts/playlet.js
 */
const path = require('path');

const rootDir = path.resolve(__dirname, '../');
require('dotenv').config({ path: path.resolve(rootDir, '.env') });

const { default: axios } = require('axios');
const playletModel = require('../src/admin/models/playlet');
const videoModel = require('../src/admin/models/video');

async function getPlayletListAync() {
  return axios.post('https://api.shortsshow.com/api/web/flow/sections', {
    for_device: 'pc', section_id: '', page: 3, page_size: 12, sign: '8896e20fde716a6caf906a271d07c658',
  });
}

async function addData(item) {
  const payload = {
    title: item.title,
    intro: item.intro,
    cover: item.cover,
    price: 0,
  };
  const exist = await playletModel.findBy('title', item.title);
  if (!exist) {
    await playletModel.create(payload);
    console.log(`insert data: ${item.title}`);
  } else {
    console.log(`duplicate data: ${item.title}`);
  }
}

async function getPlayletList() {
  const ret = await getPlayletListAync();
  if (ret.data.code !== 112200) {
    console.log('empty data');
    return;
  }
  const data = ret.data.data.items;
  for (let i = 0; i < data.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await addData(data[i]);
  }
}

async function getPlayletDetailAsync() {
  return axios.post(
    'https://api.shortsshow.com/api/web/playlet',
    { playlet_id: '12', sign: 'c7d77bd1b3567fcd603c7c344a48940e' },
  );
}

async function addVideo(item, playlet_id) {
  const {
    free, id, link, num, title,
  } = item;
  const video = await videoModel.findBy('original_id', id);
  if (!video) {
    const payload = {
      free,
      link,
      num,
      title,
      playlet_id,
      original_id: id,
    };
    await videoModel.create(payload);
    console.log(`insert video: ${title}`);
  } else {
    console.log(`duplicate video: ${title}`);
  }
}

async function getPlayletDetail() {
  const ret = await getPlayletDetailAsync();
  if (ret.data.msg !== 'success') {
    console.log('empty data');
    return;
  }
  const { data } = ret.data;
  const { title, price, videos } = data;
  const playlet = await playletModel.findBy('title', title);
  if (!playlet) {
    console.log('playlet not exist');
    return;
  }
  await playletModel.getModel().where({ id: playlet.id }).update({ price });
  for (let i = 0; i < videos.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await addVideo(videos[i], playlet.id);
  }
}

async function main() {
  // await getPlayletList()
  await getPlayletDetail();
}

main().finally(process.exit);
