const { verify } = require('../src/utils/auth');
const User = require('../src/models/user');

const auth = (block, options = {}) => (req, res, next) => {
  const token = (req.get('Authorization') || req.cookies.token || '').replace(/^Bearer\s/, '');
  const failFn = block ? () => res.type('json').status(401).end() : next;
  if (!token) {
    return failFn();
  }
  const user = verify(token);
  if (user) {
    const { detail, checkAdmin } = options;
    res.user = user;
    res.token = token;
    if (detail) {
      return User.find(user.id).then((data) => {
        res.user = data;
        if (checkAdmin && data.role !== 'admin') {
          return failFn();
        }
        next();
      }).catch(failFn);
    }
    return next();
  }
  failFn();
};

module.exports = auth(true);
module.exports.authOnly = auth(false);
module.exports.authDetail = auth(true, { detail: true });
module.exports.authDetailOnly = auth(false, { detail: true });
module.exports.authAdmin = auth(true, { checkAdmin: true, detail: true });
