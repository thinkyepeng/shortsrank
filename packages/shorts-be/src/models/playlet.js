const knex = require('./index');

const LIST_FIELDS = [
  'id',
  'title',
  'intro',
  'cover',
  'episodes',
  'finish',
  'free_episodes',
  'paid_type',
  'price',
  'state',
  'auto_unlock',
  'views',
  'created',
  'updated',
];
function getModel() {
  return knex('playlets');
}
function create(data) {
  return getModel().returning(LIST_FIELDS).insert(data).then((ids) => find(ids[0]));
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
async function getByCategory(category_id, limit) {
  const tb2 = 'playlet_category_relations';
  const fields = LIST_FIELDS.map((x) => `playlets.${x}`);
  return getModel().rightJoin(tb2, function join() {
    this.on('playlets.id', '=', `${tb2}.playlet_id`);
  }).where({ 'playlet_category_relations.category_id': category_id }).limit(limit)
    .select(...fields);
}

module.exports = {
  create,
  find,
  findBy,
  findFirst,
  getModel,
  findAll,
  getByCategory,
  LIST_FIELDS,
};
