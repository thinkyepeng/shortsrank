const knex = require('./index');

const LIST_FIELDS = [
  'id',
  'video_id',
  'user_id',
  'created',
  'updated',
];
function getModel() {
  return knex('episodes');
}
function findBy(field, value) {
  return getModel().where({ [field]: value }).first();
}
function find(userId) {
  return findBy('id', userId);
}
function create(data) {
  return getModel().returning(LIST_FIELDS).insert(data).then((ids) => find(ids[0]));
}
function findFirst(where) {
  return getModel().where(where).first();
}
function findAll(where) {
  return getModel().where(where).select('*');
}

module.exports = {
  create,
  find,
  findBy,
  findFirst,
  getModel,
  findAll,
  LIST_FIELDS,
};
