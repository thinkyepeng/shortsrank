const uuid = require('uuid');

const uniqueId = function (length) {
  const all = uuid.v4().split('-').slice(0, 3).join('');
  return length > 0 ? all.slice(0, length) : all;
};

const randomCode = function (len) {
  const arr = '0123456789'.split('');
  const ret = [];
  for (let i = 0; i < len; i++) {
    const key = Math.ceil(Math.random() * 10) - 1;
    ret.push(arr[key]);
  }
  return ret.join('');
};

module.exports = {
  uniqueId,
  randomCode,
};
