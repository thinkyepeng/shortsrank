const { authOnly } = require('../../middleware/auth');
const auth = require('../../middleware/auth');
const playerController = require('../controllers/player/index');

function applyPlayerRouter(app) {
  app.get('/api/playlet/detail', authOnly, playerController.getPlayletDetail);
  app.post('/api/playlet/unlock_video', auth, playerController.unlockVideo);
}

module.exports = {
  applyPlayerRouter,
};
