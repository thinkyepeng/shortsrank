const { validate } = require('indicative').validator;
const moment = require('moment');
const knex = require('../../models/index');
const { LIST_FIELDS } = require('../../models/log');
const userModel = require('../../models/user');
const mainModel = require('../../models/log');
const Searcher = require('../../utils/ip2region');

let searcherIns = null;
function getSearchIns() {
  if (searcherIns) {
    return searcherIns;
  }
  try {
    searcherIns = Searcher.newWithFileOnly(process.env.IP2REGION_XDB);
  } catch (err) {
    return null;
  }
  return searcherIns;
}

async function getIpsData(ips) {
  const ins = getSearchIns();
  if (!ins) {
    return {};
  }
  const result = {};
  ips.forEach(async (ip) => {
    try {
      const info = await ins.search(ip);
      result[ip] = info;
    } catch (err) {
      // todo invalid ip
    }
  });
  return result;
}

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
  const { isSpider, date, t } = rawData;
  if (isSpider === '0') {
    queryBuilder.andWhere({ spider: '' });
    totalBuilder.andWhere({ spider: '' });
  } else if (isSpider === '1') {
    queryBuilder.andWhereNot({ spider: '' });
    totalBuilder.andWhereNot({ spider: '' });
  }

  if (date === 'today') {
    const start = moment().startOf('day').format('YYYY-MM-DD 00:00:00');
    const end = moment().endOf('day').format('YYYY-MM-DD 23:59:59');
    queryBuilder.whereBetween('created', [start, end]);
    totalBuilder.whereBetween('created', [start, end]);
  } else if (date === 'yesterday') {
    const current = moment().subtract(1, 'days');
    const start = current.format('YYYY-MM-DD 00:00:00');
    const end = current.format('YYYY-MM-DD 23:59:59');
    queryBuilder.whereBetween('created', [start, end]);
    totalBuilder.whereBetween('created', [start, end]);
  }

  if (t) {
    queryBuilder.andWhere({ t });
    totalBuilder.andWhere({ t });
  }
}

function getOrderCondition(sorts) {
  const validKeys = ['created'];
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
    isDelete: 'integer',
    searchType: 'string',
    filters: 'array',
  };
  try {
    await validate(req.query, rules);
  } catch (messages) {
    return next('参数错误');
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
    const likeTypes = ['name'];
    const isTypes = ['cid', 'ip', 'sid'];
    if (likeTypes.includes(searchType)) {
      queryBuilder.andWhereILike(searchType, `%${keyword}%`);
      totalBuilder.andWhereILike(searchType, `%${keyword}%`);
    } else if (searchType === 'userId') {
      queryBuilder.andWhere({ uid: keyword });
      totalBuilder.andWhere({ uid: keyword });
    } else if (searchType === 'username') {
      const user = await userModel.findFirst({ username: keyword });
      const userId = user ? user.id : -1;
      queryBuilder.andWhere({ uid: userId });
      totalBuilder.andWhere({ uid: userId });
    } else if (isTypes.includes(searchType)) {
      queryBuilder.andWhere({ [searchType]: keyword });
      totalBuilder.andWhere({ [searchType]: keyword });
    }
  }

  const ordderBy = getOrderCondition(req.query.sorts);
  queryBuilder.orderBy(ordderBy).limit(pageSize).offset(offset).select()
    .then(async (data) => {
      const filterNull = (x) => !!x.uid;
      const userIds = Array.from(new Set(data.filter(filterNull).map((t) => parseInt(t.uid, 10))));
      const users = await userModel.getModel().whereIn('id', userIds)
        .select('id', 'avatar', 'username', 'nickname', 'created');
      const ips = Array.from(new Set(data.filter((x) => x.ip).map((x) => x.ip)));
      const ipsData = await getIpsData(ips);
      res.json({
        code: 0,
        data: {
          total: ((await totalBuilder.count('*', { as: 'total' }))[0] || {}).total || 0,
          page,
          pageSize,
          rows: data,
          users,
          ipsData,
        },
      });
    })
    .catch(next);
}

async function getIpInfo(req, res, next) {
  const rules = {
    ip: 'string',
  };
  try {
    await validate(req.query || {}, rules);
  } catch (messages) {
    return next('参数错误');
  }
  const searcher = getSearchIns();
  if (!searcher) {
    return next('ip server error');
  }
  return res.json({ code: 0, data: searcher.search(req.query.ip) });
}

// 按cid 分组当天的 visitors
async function getVisitors(req, res, next) {
  const start = moment().startOf('day').format('YYYY-MM-DD 00:00:00');
  const end = moment().endOf('day').format('YYYY-MM-DD 23:59:59');
  const sql = `SELECT count(*) as total, MAX(created) as created, min(uid) as userId, cid FROM js_logs where t='pageview' and spider='' and created between '${start}' and '${end}' group by cid order by created desc;`;
  const data = await knex.raw(sql);
  res.json({ code: 0, data: data[0] || [] });
}

module.exports = {
  getList,
  getIpInfo,
  getVisitors,
};
