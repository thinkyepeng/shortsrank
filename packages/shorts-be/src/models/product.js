const knex = require('./index');

const LIST_FIELDS = [
  'id',
  'coins',
  'description',
  'price',
  'product_id',
  'product_name',
  'created',
  'updated',
];
function getModel() {
  return knex('products');
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
