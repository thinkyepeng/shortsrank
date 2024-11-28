const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: process.env.LOG_FILE, level: 'error' }),
    new winston.transports.File({ filename: process.env.ERR_FILE }),
  ],
});

module.exports = {
  logger,
};
