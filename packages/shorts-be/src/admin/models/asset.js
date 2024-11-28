const knex = require('./index');

const LIST_FIELDS = [
  'id',
  'filename',
  'mimetype',
  'originalname',
  'size',
  'is_delete',
  'created',
  'updated',
];
function getModel() {
  return knex('assets');
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
function findAll(where) {
  return getModel().where(where).select('*');
}
function create(data) {
  return getModel().returning(LIST_FIELDS).insert(data).then((ids) => find(ids[0]));
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
