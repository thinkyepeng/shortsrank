const { validate } = require('indicative').validator;
const _ = require('lodash');
const videoModel = require('../../models/video');
const mainModel = require('../../models/playlet');
const paramUtils = require('../../utils/param');

function addFilters(queryBuilder, totalBuilder, filters) {
  if (!filters || filters?.length < 1) {
    return;
  }
  const rawData = filters.reduce((calc, c) => {
    if (typeof c !== 'string' || c.indexOf(':') < 0) {
      return calc;
    }
    const [key, value] = c.split(':');
    calc[key] = value;
    return calc;
  }, {});
  const { is_delete } = rawData;
  if (['0', '1'].includes(is_delete)) {
    queryBuilder.andWhere({ is_delete });
    totalBuilder.andWhere({ is_delete });
  }
}

async function getList(req, res, next) {
  const rules = {
    page: 'integer|above:0',
    pageSize: 'integer|range:1,20',
    keyword: 'string',
    searchType: 'string',
    filters: 'array',
  };
  try {
    await validate(req.query, rules);
  } catch (messages) {
    return next('Params error');
  }
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 12;
  const offset = (page - 1) * pageSize;
  const keyword = paramUtils.getString(req.query, 'keyword', '');
  const searchType = paramUtils.getString(req.query, 'searchType', 'title');
  const fields = mainModel.LIST_FIELDS;
  const queryBuilder = mainModel.getModel().select(...fields);
  const totalBuilder = mainModel.getModel();
  addFilters(queryBuilder, totalBuilder, ['is_delete:0']);

  if (keyword.length > 1) {
    const likeTypes = ['title'];
    if (likeTypes.includes(searchType)) {
      queryBuilder.andWhereILike(searchType, `%${keyword}%`);
      totalBuilder.andWhereILike(searchType, `%${keyword}%`);
    }
  }

  queryBuilder.orderBy('created', 'desc').limit(pageSize).offset(offset).select()
    .then(async (data) => {
      const playletIds = data.map((x) => x.id);
      const videoFields = ['id', 'free', 'num', 'title', 'playlet_id'];
      const videos = await videoModel.getModel()
        .where({ is_delete: 0 })
        .whereIn('playlet_id', playletIds).select(...videoFields);
      const filterFn = (playlet_id) => (x) => x.playlet_id === playlet_id;
      const groupFn = (v) => Math.floor(v.num / 30);
      const rows = data.map((item) => {
        const groupedVideosMap = _.groupBy(_.orderBy(videos.filter(filterFn(item.id)), ['num'], ['asc']), groupFn);
        const keys = Object.keys(groupedVideosMap);
        keys.sort();
        const groupedVideos = keys.map((key) => {
          const items = groupedVideosMap[key];
          const first = items[0];
          const last = items[items.length - 1];
          return {
            label: `${first.num}-${last.num}`,
            videos: items,
          };
        });
        return {
          ...item,
          videos: groupedVideos,
        };
      });
      res.json({
        code: 0,
        data: {
          total: ((await totalBuilder.count('*', { as: 'total' }))[0] || {}).total || 0,
          page,
          pageSize,
          rows,
        },
      });
    })
    .catch(next);
}

module.exports = {
  getList,
};
