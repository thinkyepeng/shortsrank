const _ = require('lodash');
const { validate } = require('indicative').validator;
const { LIST_FIELDS } = require('../../models/user');
const mainModel = require('../../models/user');

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
  const { is_delete, role } = rawData;
  if (['0', '1'].includes(is_delete)) {
    queryBuilder.andWhere({ is_delete });
    totalBuilder.andWhere({ is_delete });
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
  const queryBuilder = mainModel.getModel().select(...fields);
  const totalBuilder = mainModel.getModel();
  addFilters(queryBuilder, totalBuilder, filters);
  addFilters(queryBuilder, totalBuilder, ['is_delete:0']);

  if (keyword.length > 1) {
    const likeTypes = ['nickname'];
    if (likeTypes.includes(searchType)) {
      queryBuilder.andWhereILike(searchType, `%${keyword}%`);
      totalBuilder.andWhereILike(searchType, `%${keyword}%`);
    } else if (searchType === 'userId') {
      queryBuilder.andWhere({ id: keyword });
      totalBuilder.andWhere({ id: keyword });
    } else if (searchType === 'username') {
      const user = await mainModel.findFirst({ username: keyword });
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

async function deleteData() {
  // todo
}

module.exports = {
  getUserInfo,
  getList,
  deleteData,
};
