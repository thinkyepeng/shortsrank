const { validate } = require('indicative').validator;
const { LIST_FIELDS } = require('../../models/banner');
const mainModel = require('../../models/banner');
const paramUtils = require('../../../utils/param');
const responseUtils = require('../../../utils/response');

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
  const { enabled } = rawData;
  if (['0', '1'].includes(enabled)) {
    queryBuilder.andWhere({ enabled });
    totalBuilder.andWhere({ enabled });
  }
}

function getOrderCondition(sorts) {
  const validKeys = ['id', 'sort'];
  const validValues = ['desc', 'asc'];
  const defaultSort = [
    { column: 'id', order: 'desc' },
  ];
  if (!sorts || sorts?.length < 1) {
    return defaultSort;
  }
  const ret = [];
  for (let i = 0; i < sorts.length; i++) {
    if (typeof sorts[i] !== 'string' || sorts[i].indexOf(':') < 0) {
      continue;
    }
    const [key, value] = sorts[i].split(':');
    if (validKeys.includes(key) && validValues.includes(value)) {
      ret.push({ column: key, order: value });
    }
  }
  if (ret.length < 1) {
    return defaultSort;
  }
  return ret;
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
  const keyword = req.query.keyword || '';
  const { searchType } = req.query;
  const { filters } = req.query;
  const fields = LIST_FIELDS;
  const queryBuilder = mainModel.getModel().select(...fields);
  const totalBuilder = mainModel.getModel();
  addFilters(queryBuilder, totalBuilder, filters);

  if (keyword.length > 1) {
    const likeTypes = ['title'];
    if (likeTypes.includes(searchType)) {
      queryBuilder.andWhereILike(searchType, `%${keyword}%`);
      totalBuilder.andWhereILike(searchType, `%${keyword}%`);
    }
  }

  const ordderBy = getOrderCondition(req.query.sorts);
  queryBuilder.orderBy(ordderBy).limit(pageSize).offset(offset).select()
    .then(async (data) => {
      res.json({
        code: 0,
        data: {
          total: ((await totalBuilder.count('*', { as: 'total' }))[0] || {}).total || 0,
          page,
          pageSize,
          rows: data,
        },
      });
    })
    .catch(next);
}

async function updateData(req, res, next) {
  const rules = {
    image: 'string',
    sort: 'integer',
    enabled: 'integer',
    id: 'integer',
    playlet_id: 'integer',
  };
  try {
    await validate(req.body, rules);
  } catch (messages) {
    return next('Params error');
  }
  const {
    image, sort, playlet_id, enabled, id,
  } = req.body;
  const updateData = {
    sort, image, playlet_id, enabled,
  };
  if (id) {
    try {
      await mainModel.getModel().where({ id }).update(updateData);
    } catch (err) {
      return next('failed');
    }
  } else {
    try {
      await mainModel.create(updateData);
    } catch (err) {
      return next('failed');
    }
  }
  return res.json({ code: 0 });
}

async function deleteData(req, res, next) {
  const id = paramUtils.getString(req.body, 'id', '');
  if (id) {
    try {
      await mainModel.getModel().where({ id }).delete();
    } catch (err) {
      return next(err);
    }
  }
  responseUtils.success(res);
}

module.exports = {
  getList,
  updateData,
  deleteData,
};
