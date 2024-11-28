const { validate } = require('indicative').validator;
const _ = require('lodash');
const User = require('../../models/user');
const Hash = require('../../utils/hash');
const knex = require('../../models/index');

const getUserInfo = (req, res) => {
  knex('users').where({ id: res.user.id }).first().then((row) => {
    const data = _.omit(row, ['password', 'delete', 'disabled',
      'role', 'id', 'updated',
    ]);
    res.type('json').send({ code: 0, data });
  })
    .catch(() => res.type('json').send({ code: 1, message: 'user not found' }));
};

const getPublicInfo = async (req, res) => {
  const username = ((req.query || {}).username || '').trim();
  if (!username) {
    return res.type('json').send({ code: 1, msg: 'Params error' });
  }
  knex('js_users').where({ username }).first().then((row) => {
    if (!row) {
      return res.type('json').send({ code: 1, message: 'user not found' });
    }
    res.type('json').send({ code: 0, data: _.pick(row, ['username', 'nickname', 'avatar']) });
  })
    .catch(() => res.type('json').send({ code: 1, message: 'user not found' }));
};

async function updateUser(request, response) {
  const rules = {
    nickname: 'min:3|max:30',
    realName: 'min:3|max:30',
    avatar: 'url',
    email: 'min:3|max:60|email|unique|token',
    password: 'min:6|max:20',
    oldPassword: 'min:6|max:20',
    username: 'min:3|max:18',
  };
  let validated;
  const names = {
    nickname: '昵称', realName: '姓名', email: '邮箱', password: '密码', avatar: '头像', oldPassword: '旧密码', token: '验证码', username: '用户名',
  };
  const messages = {
    required: (field) => `${names[field]}必填`,
    min: (field, _, args) => `${names[field]}至少${args[0]}个字符`,
    max: (field, _, args) => `${names[field]}最多${args[0]}个字符`,
    url: (field) => `${names[field]}地址无效`,
    email: '请输入有效的邮箱',
    'email.unique': '该邮箱已被占用',
    'email.token': '邮箱验证码无效',
  };
  try {
    validated = await validate(request.body || {}, rules, messages, { removeAdditional: true });
  } catch (messages) {
    return response.json({ code: 1, message: messages[0].message, messages });
  }

  const user = await User.find(response.user.id);
  const { password, oldPassword, ...others } = validated;
  const payload = others;
  // 更新密码
  if (password) {
    // 有旧密码时，需要提供旧密码；无旧密码时，直接更新密码
    if (user.password) {
      if (!oldPassword) {
        return response.json({ code: 1, message: '需要提供当前密码' });
      }

      const matched = await Hash.verify(oldPassword, user.password);
      if (!matched) {
        return response.json({ code: 1, message: '当前密码不正确' });
      }
    }
    payload.password = await Hash.make(password);
  }
  if (Object.keys(payload).length === 0) {
    return response.json({ code: 1, message: '没有信息被更新' });
  }
  try {
    await User.getModel().where({ id: response.user.id }).update(payload);
  } catch (err) {
    return response.json({ code: 1, message: '更新失败' });
  }
  let data = await User.find(response.user.id);
  data = _.omit(data, ['password', 'delete', 'disabled', 'pigaiToken', 'role']);
  return response.json({ code: 0, data });
}

function logout(request, response) {
  response.clearCookie('token');
  response.json({ code: 0 });
}

module.exports = {
  updateUser,
  getUserInfo,
  getPublicInfo,
  logout,
};
