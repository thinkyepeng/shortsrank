const homeController = require('../controllers/home/index');

function applyHomeRouter(app) {
  app.get('/api/home/sections', homeController.getSections);
}

module.exports = {
  applyHomeRouter,
};
