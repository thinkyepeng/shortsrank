const paymentController = require('../controllers/payment/index');
const auth = require('../../middleware/auth');

function applyPaymentRouter(app) {
  app.get('/api/payment/info', paymentController.getPaymentInfo);
  app.post('/api/payment/create_order', auth, paymentController.createOrder);
  app.get('/api/payment/success_callback', auth, paymentController.successCallback);
  app.get('/api/payment/history', auth, paymentController.getOrderHistory);
  app.get('/api/payment/episodes', auth, paymentController.getEpisodesHistory);
}

module.exports = {
  applyPaymentRouter,
};
