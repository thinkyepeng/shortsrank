const uuid = require('uuid');

const uniqueId = function () {
  return uuid.v4().split('-').slice(0, 3).join('');
};

function randomNumberCode(len) {
  let code = '';
  for (let i = 0; i < len; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

function getFileExt(filename) {
  const arr = filename.split('.');
  const ext = arr[arr.length - 1];
  return ext ? `.${ext}`.toLocaleLowerCase() : '';
}

module.exports = {
  uniqueId,
  randomNumberCode,
  getFileExt,
};
