const { GenericError, ValidationError, AuthError } = require('../utils/error');
const { fail } = require('../src/utils/response');
const { logger } = require('./log');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ValidationError) {
    return fail(res, err.message || 'Params error');
  } if (err instanceof GenericError) {
    return fail(res, err.message || '接口错误');
  } if (err instanceof AuthError) {
    return fail(res, err.message || '认证失败');
  }
  const text = typeof err === 'string' ? err : '接口错误-010';
  if (typeof err !== 'string') {
    logger.error(err?.message || '接口错误-010');
  }
  fail(res, text);
}

module.exports = {
  errorHandler,
};
