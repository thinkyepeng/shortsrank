const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const RedisClient = require('ioredis');
const md5 = require('md5');

const client = new RedisClient();

const throttler = (minute, max) => rateLimit({
  windowMs: minute * 60 * 1000, // 15 minutes
  max, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  store: new RedisStore({
    sendCommand: (...args) => client.call(...args),
  }),
  keyGenerator: (req) => md5(`${req.path}-${req.ip}`),
});

module.exports = {
  throttler,
};
