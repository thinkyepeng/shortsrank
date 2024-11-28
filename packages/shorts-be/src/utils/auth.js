const jwt = require('jsonwebtoken');

const generate = function (payload) {
  return jwt.sign(payload, process.env.APP_KEY, {
    expiresIn: 1 * 24 * 3600 * 30, // 30 days
  });
};
const verify = function (token) {
  try {
    const ret = jwt.verify(token, process.env.APP_KEY);
    return ret;
  } catch (err) {
    return false;
  }
};

module.exports = {
  generate,
  verify,
};
