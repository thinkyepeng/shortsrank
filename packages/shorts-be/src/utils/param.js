function isString(v) {
  return typeof v === 'string';
}

function get(data, name, defaultValue) {
  const v = data?.[name];
  return v === undefined ? defaultValue : v;
}

function getString(data, name, defaultValue) {
  const v = data?.[name];
  return isString(v) ? v : defaultValue;
}

function getInteger(data, name, defaultValue) {
  const v = data?.[name];
  return Number.isInteger(v) ? v : defaultValue;
}

module.exports = {
  get,
  getString,
  getInteger,
};
