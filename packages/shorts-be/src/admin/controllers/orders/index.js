const { validate } = require('indicative').validator;
const { LIST_FIELDS } = require('../../models/order');
const userModel = require('../../models/user');
const mainModel = require('../../models/order');

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
  const { is_delete, isPay } = rawData;
  if (['0', '1'].includes(is_delete)) {
    queryBuilder.andWhere({ is_delete });
    totalBuilder.andWhere({ is_delete });
  }
  if (['0', '1'].includes(isPay)) {
    queryBuilder.andWhere({ status: isPay ? 1 : 0 });
    totalBuilder.andWhere({ status: isPay ? 1 : 0 });
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
    const likeTypes = ['out_order_number', 'product_name'];
    if (likeTypes.includes(searchType)) {
      queryBuilder.andWhereILike(searchType, `%${keyword}%`);
      totalBuilder.andWhereILike(searchType, `%${keyword}%`);
    } else if (searchType === 'userId') {
      queryBuilder.andWhere({ id: keyword });
      totalBuilder.andWhere({ id: keyword });
    } else if (searchType === 'username') {
      const user = await userModel.findFirst({ username: keyword });
      const userId = user ? user.id : -1;
      queryBuilder.andWhere({ user_id: userId });
      totalBuilder.andWhere({ user_id: userId });
    }
  }

  const ordderBy = getOrderCondition(req.query.sorts);
  queryBuilder.orderBy(ordderBy).limit(pageSize).offset(offset).select()
    .then(async (data) => {
      const userIds = Array.from(new Set(data.map((t) => t.user_id)));
      const users = await userModel.getModel().whereIn('id', userIds).select('id', 'avatar', 'username', 'balance', 'created');
      res.json({
        code: 0,
        data: {
          total: ((await totalBuilder.count('*', { as: 'total' }))[0] || {}).total || 0,
          page,
          pageSize,
          rows: data,
          users,
        },
      });
    })
    .catch(next);
}

module.exports = {
  getList,
};
