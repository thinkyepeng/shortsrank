const auth = require('../../middleware/auth');
const userController = require('../controllers/user/index');
const googleController = require('../controllers/user/google');

function applyUserRouter(app) {
  app.post('/api/users/oauth/google/login', googleController.handleToken);
  // app.get('/api/users/oauth/google/agent', googleController.testHttpAgent);
  app.post('/api/users/logout', userController.logout);
  app.get('/api/users/me', auth, userController.getUserInfo);
}

module.exports = {
  applyUserRouter,
};
