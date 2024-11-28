const { applyConfigRouter } = require('./config');
const { applyUserRouter } = require('./user');
const { applyHomeRouter } = require('./home');
const { applyCategoryRouter } = require('./category');
const { applySearchRouter } = require('./search');
const { applyPlayerRouter } = require('./player');
const { applyPaymentRouter } = require('./payment');
const { applyLogRouter } = require('./log');

const applyRouter = (app) => {
  applyConfigRouter(app);
  applyUserRouter(app);
  applyHomeRouter(app);
  applyCategoryRouter(app);
  applySearchRouter(app);
  applyPlayerRouter(app);
  applyPaymentRouter(app);
  applyLogRouter(app);
};

module.exports = {
  applyRouter,
};
