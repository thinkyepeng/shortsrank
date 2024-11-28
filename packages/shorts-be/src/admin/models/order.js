const knex = require('./index');

const LIST_FIELDS = [
  'id',
  'user_id',
  'product_id',
  'coins',
  'description',
  'product_name',
  'price',
  'out_order_number',
  'status',
  'payment_id',
  'payment',
  'is_delete',
  'checkout_url',
  'created',
  'updated',
];
function getModel() {
  return knex('orders');
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
