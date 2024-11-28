const _ = require('lodash');
const requestIp = require('request-ip');
const logModel = require('../../models/log');
const { getSpiderName } = require('./util');

async function saveLog(req, res, next) {
  const data = _.pick(req.query, ['dl', 'dh', 'refer', 'sid', 'tid', 'cid', 'group', 't', 'lng', 'z', 'w', 'h', 'ec', 'ea', 'el', 'ev']);
  try {
    data.uid = res.user?.id;
    data.ip = requestIp.getClientIp(req) || '';
    data.ua = req.get('User-Agent');
    data.devicePixelRatio = req.query.r || 1;
    data.spider = getSpiderName(data.ua);
    await logModel.create(data);
    res.json({ code: 0 });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  saveLog,
};
