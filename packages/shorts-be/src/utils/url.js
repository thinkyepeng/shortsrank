const qs = require('query-string');

const addQuery = function (url, query) {
  const [prefix, search] = (url || '').split('?');
  const obj = qs.parse(search || '');
  Object.assign(obj, query);
  return [prefix, qs.stringify(obj)].join('?');
};

module.exports = {
  addQuery,
};
