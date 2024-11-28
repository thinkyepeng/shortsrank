const ConfigModel = require('../../models/config');

const getConfigByKey = async function (req, res) {
  const key = (req.query.key || '').trim();
  if (!key) {
    return res.json({ code: 1, message: 'key不存在-01' });
  }
  const item = await ConfigModel.findBy('key', key);
  if (!item || !item.value) {
    return res.json({ code: 1, message: 'key不存在-02' });
  }
  return res.json({ code: 0, data: item.value });
};

module.exports = {
  getConfigByKey,
};
