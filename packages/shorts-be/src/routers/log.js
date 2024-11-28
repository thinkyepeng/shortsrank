const auth = require('../../middleware/auth');
const {
  saveLog,
} = require('../controllers/log/index');

function applyLogRouter(app) {
  app.get('/api/log', auth.authOnly, saveLog);
}

module.exports = {
  applyLogRouter,
};
