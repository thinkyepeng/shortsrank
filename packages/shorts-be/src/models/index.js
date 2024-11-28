let knex;
if (!knex) {
  knex = require('knex')({
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: 'utf8mb4',
    },
  });
}

module.exports = knex;
