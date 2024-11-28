const knex = require('./index');

function getModel() {
  return knex('logs');
}
function findBy(field, value) {
  return getModel().where({ [field]: value }).first();
}
function find(chatId) {
  return findBy('id', chatId);
}
function create(data) {
  return getModel().returning('*').insert(data).then((ids) => find(ids[0]));
}
function findByUser(userId) {
  return getModel().where({ userId });
}
function findFirst(where) {
  return getModel().where(where).first();
}

module.exports = {
  create,
  find,
  findBy,
  findFirst,
  getModel,
  findByUser,
};
