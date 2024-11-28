const moment = require('moment');

const now = () => moment().format('YYYY-MM-DD HH:mm:ss');

module.exports = {
  now,
};
