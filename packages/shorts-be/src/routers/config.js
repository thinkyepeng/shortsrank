const { getConfigByKey } = require('../controllers/config');

function applyConfigRouter(app) {
  app.get('/api/config/by_key', getConfigByKey);
}

module.exports = {
  applyConfigRouter,
};
