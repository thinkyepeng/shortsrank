const bcrypt = require('bcryptjs');

function make(value) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, 10, (error, hash) => {
      if (error) {
        return reject(error);
      }
      resolve(hash);
    });
  });
}

function verify(value, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (error, response) => {
      if (error) {
        return resolve(false);
      }
      resolve(response);
    });
  });
}

module.exports = {
  make,
  verify,
};
