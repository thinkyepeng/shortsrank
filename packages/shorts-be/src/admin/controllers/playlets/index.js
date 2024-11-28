const { validate } = require('indicative').validator;
const { LIST_FIELDS } = require('../../models/playlet');
const mainModel = require('../../models/playlet');
const relationModel = require('../../models/playlet_category_relation');
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
  const { is_delete } = rawData;
  if (['0', '1'].includes(is_delete)) {
    queryBuilder.andWhere({ is_delete });
    totalBuilder.andWhere({ is_delete });
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
  const tb1 = 'playlets';
  const tb2 = 'playlet_category_relations';
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 12;
  const offset = (page - 1) * pageSize;
  const keyword = req.query.keyword || '';
  const { searchType } = req.query;
  const { filters } = req.query;
  const fields = LIST_FIELDS.map((x) => `${tb1}.${x}`);
  const queryBuilder = mainModel.getModel().select(...fields);
  const totalBuilder = mainModel.getModel();
  addFilters(queryBuilder, totalBuilder, filters);
  addFilters(queryBuilder, totalBuilder, ['is_delete:0']);

  if (keyword.length > 0) {
    const likeTypes = ['title'];
    if (likeTypes.includes(searchType)) {
      queryBuilder.andWhereILike(searchType, `%${keyword}%`);
      totalBuilder.andWhereILike(searchType, `%${keyword}%`);
    } else if (searchType === 'categoryId') {
      queryBuilder.rightJoin(tb2, function join() {
        this.on(`${tb1}.id`, '=', `${tb2}.playlet_id`);
      }).andWhere(`${tb2}.category_id`, keyword);
      totalBuilder.rightJoin(tb2, function join() {
        this.on(`${tb1}.id`, '=', `${tb2}.playlet_id`);
      }).andWhere(`${tb2}.category_id`, keyword);
    }
  }

  const ordderBy = getOrderCondition(req.query.sorts);
  queryBuilder.orderBy(ordderBy).limit(pageSize).offset(offset).select()
    .then(async (data) => {
      const playletIds = data.map((x) => x.id);
      const tb1 = relationModel.TABLE_NAME;
      const tb2 = 'categories';
      const relations = await relationModel.getModel().whereIn('playlet_id', playletIds)
        .leftJoin('categories', function join() {
          this.on(`${tb1}.category_id`, '=', `${tb2}.id`);
        })
        .select(`${tb1}.playlet_id`, `${tb1}.category_id`, `${tb2}.title`);
      const relationMap = relations.reduce((calc, t) => {
        if (!(t.playlet_id in calc)) {
          calc[t.playlet_id] = [];
        }
        calc[t.playlet_id].push(t);
        return calc;
      }, {});
      const rows = data.map((t) => ({
        ...t,
        categories: relationMap[t.id] || [],
      }));
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

async function updateCategories(playlet_id, categories, extra) {
  const { categoryId, sort } = extra;
  const categoryIds = categories.map((x) => x.category_id);
  const records = await relationModel.getModel().where({ playlet_id }).select('*');
  const rows = records.map((x) => x.category_id);
  const toBeRemoved = rows.filter((x) => !(categoryIds.includes(x)));
  const toBeAdded = categoryIds.filter((x) => !(rows.includes(x)));
  if (toBeRemoved.length > 0) {
    await relationModel.getModel().where({ playlet_id }).andWhere('category_id', 'in', toBeRemoved).delete();
  }
  if (toBeAdded.length > 0) {
    for (let i = 0; i < toBeAdded.length; i += 1) {
      await relationModel.create({ playlet_id, category_id: toBeAdded[i] });
    }
  }
  if (categoryId) {
    await relationModel.getModel().where({ playlet_id, category_id: categoryId }).update({ sort });
  }
}

async function updateData(req, res, next) {
  const rules = {
    title: 'string|required',
    intro: 'string',
    cover: 'string',
    price: 'integer',
    id: 'integer',
    categories: 'array|required',
  };
  try {
    await validate(req.body, rules);
  } catch (messages) {
    return next('Params error');
  }
  const {
    title, id, intro, cover, price, categories,categoryId,sort,
  } = req.body;
  const updateData = {
    title, intro, cover, price,
  };
  let playletId = id;
  if (playletId) {
    try {
      await mainModel.getModel().where({ id }).update(updateData);
    } catch (err) {
      return next('failed');
    }
  } else {
    try {
      const item = await mainModel.create(updateData);
      playletId = item.id;
    } catch (err) {
      return next('failed');
    }
  }
  await updateCategories(playletId, categories, { categoryId, sort });
  return res.json({ code: 0 });
}

async function deleteData(req, res, next) {
  const id = paramUtils.getString(req.body, 'id', '');
  if (id) {
    try {
      await mainModel.getModel().where({ id }).update({ is_delete: 1 });
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
