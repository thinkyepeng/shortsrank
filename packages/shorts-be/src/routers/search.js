const searchController = require('../controllers/search/index');

function applySearchRouter(app) {
  app.get('/api/search/list', searchController.getList);
}

module.exports = {
  applySearchRouter,
};
