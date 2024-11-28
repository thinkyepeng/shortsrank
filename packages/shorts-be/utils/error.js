/* eslint-disable max-classes-per-file */
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
class GenericError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GenericError';
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

module.exports = {
  ValidationError,
  GenericError,
  AuthError,
};
