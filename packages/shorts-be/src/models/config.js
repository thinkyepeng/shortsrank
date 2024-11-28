const knex = require('./index');

function getModel() {
  return knex('configs');
}
function findBy(field, value) {
  return getModel().where(field, value).first();
}

function create(data) {
  return getModel().insert(data).then((ids) => findBy('id', ids[0]));
}

async function upsert(key, value) {
  const item = await getModel().where({ key }).first();
  if (item) {
    await getModel().where({ key }).update({ value });
    return findBy({ key });
  }
  return create({ key, value });
}

module.exports = {
  findBy,
  create,
  getModel,
  upsert,
};
