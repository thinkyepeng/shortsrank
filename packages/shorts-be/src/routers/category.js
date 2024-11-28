const categoryController = require('../controllers/category/index');

function applyCategoryRouter(app) {
  app.get('/api/category/list', categoryController.getPageData);
}

module.exports = {
  applyCategoryRouter,
};
