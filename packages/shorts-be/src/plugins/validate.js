const { extend } = require('indicative/validator');
const { getValue } = require('indicative-utils');
const { isEmail } = require('../utils/validate');
const User = require('../models/user');

extend('email', {
  async: false,
  validate(data, field) {
    // console.log('data', data, field, args, config)
    const value = getValue(data, field);
    return !value || isEmail(value);
  },
});

extend('unique', {
  async: true,
  async validate(data, field) {
    const isSupport = ['email'].includes(field);
    if (!isSupport) {
      return false;
    }
    const value = getValue(data, field);
    if (!value) {
      return true;
    }
    try {
      const user = await User.findBy(field, value);
      if (user) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;
  },
});

extend('exist', {
  async: true,
  async validate(data, field) {
    const isSupport = ['email'].includes(field);
    if (!isSupport) {
      return false;
    }
    const value = getValue(data, field);
    if (!value) {
      return true;
    }
    try {
      const user = await User.findBy(field, value);
      if (!user) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;
  },
});
