const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

dotenv.config();

function getEnvVariables() {
  const envFile = path.resolve(__dirname, '../.env');
  const envStr = fs.readFileSync(envFile, 'utf8');
  const envObj = dotenv.parse(envStr);
  delete envObj.NODE_ENV;
  return Object.keys(envObj).reduce((calc, key) => {
    calc[`process.env.${key}`] = JSON.stringify(envObj[key]);
    return calc;
  }, {});
}

module.exports = {
  mode: 'development',
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    clean: true,
    filename: 'app.js',
    libraryTarget: 'commonjs2',
  },
  optimization: {
    minimize: false,
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin(getEnvVariables()),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  cache: {
    type: 'filesystem',
  },
  // https://github.com/knex/knex/issues/1128
  externals: {
    // Possible drivers for knex - we'll ignore them
    sqlite3: 'sqlite3',
    mariasql: 'mariasql',
    mssql: 'mssql',
    mysql2: 'mysql2',
    oracle: 'oracle',
    'strong-oracle': 'strong-oracle',
    oracledb: 'oracledb',
    pg: 'pg',
    'pg-query-stream': 'pg-query-stream',
    'better-sqlite3': 'better-sqlite3',
    tedious: 'tedious',
  },
};
