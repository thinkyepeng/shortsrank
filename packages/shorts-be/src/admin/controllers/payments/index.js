const _ = require('lodash');
const { validate } = require('indicative').validator;
const knex = require('../../models/index');
const { LIST_FIELDS } = require('../../models/user');
const userModel = require('../../models/user');

const getUserInfo = (req, res) => {
  res.type('json').send({ code: 0, data: _.omit(res.user, ['password', 'delete', 'disabled', 'role']) });
};

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
  const { isPro, role } = rawData;
  if (['0', '1'].includes(isPro)) {
    queryBuilder.andWhere({ isPro });
    totalBuilder.andWhere({ isPro });
  }
  if (role) {
    queryBuilder.andWhere({ role });
    totalBuilder.andWhere({ role });
  }
}

function getOrderCondition(sorts) {
  const validKeys = ['created', 'updated'];
  const validValues = ['desc', 'asc'];
  const defaultSort = [
    { column: 'created', order: 'desc' },
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
    isPro: 'integer',
    role: 'string',
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
  const queryBuilder = knex('js_users').select(...fields);
  const totalBuilder = knex('js_users');
  addFilters(queryBuilder, totalBuilder, filters);

  if (keyword.length > 1) {
    const likeTypes = ['nickname', 'email', 'phone'];
    if (likeTypes.includes(searchType)) {
      queryBuilder.andWhereILike(searchType, `%${keyword}%`);
      totalBuilder.andWhereILike(searchType, `%${keyword}%`);
    } else if (searchType === 'userId') {
      queryBuilder.andWhere({ id: keyword });
      totalBuilder.andWhere({ id: keyword });
    } else if (searchType === 'username') {
      const user = await userModel.findFirst({ username: keyword });
      const userId = user ? user.id : -1;
      queryBuilder.andWhere({ id: userId });
      totalBuilder.andWhere({ id: userId });
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
    isPro: 'integer',
    collectTry: 'integer',
    htmlLen: 'integer',
    cssLen: 'integer',
    jsLen: 'integer',
    id: 'integer|required',
  };
  try {
    await validate(req.body, rules);
  } catch (messages) {
    return next('Params error');
  }
  const {
    isPro, id, htmlLen, cssLen, jsLen, collectTry,
  } = req.body;
  const updateData = { isPro };
  if ([0, 1].includes(isPro)) {
    updateData.isPro = isPro;
  }
  if (htmlLen > 0) {
    updateData.htmlLen = htmlLen;
  }
  if (cssLen > 0) {
    updateData.cssLen = cssLen;
  }
  if (jsLen > 0) {
    updateData.jsLen = jsLen;
  }
  if ([0, 1].includes(collectTry)) {
    updateData.collectTry = collectTry;
  }
  try {
    await userModel.getModel().where({ id }).update(updateData);
  } catch (err) {
    return next('更新失败');
  }
  return res.json({ code: 0 });
}

module.exports = {
  getUserInfo,
  getList,
  updateData,
};
