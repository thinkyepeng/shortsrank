const knex = require('./index');

const fields = [
  'id',
  'uuid',
  'username',
  'nickname',
  'avatar',
  'password',
  'email',
  'created',
  'updated',
];
function getModel() {
  return knex('users');
}
function create(data) {
  return getModel().returning(fields).insert(data).then((ids) => find(ids[0]));
}
function findBy(field, value) {
  return getModel().where({ [field]: value }).first();
}
function find(userId) {
  return findBy('id', userId);
}
function findFirst(where) {
  return getModel().where(where).first();
}

async function isDuplicatedPhone(phone) {
  const item = await findFirst({ phone });
  return !!item;
}

module.exports = {
  create,
  find,
  findBy,
  findFirst,
  getModel,
  isDuplicatedPhone,
};
