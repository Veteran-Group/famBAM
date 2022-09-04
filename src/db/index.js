const Promise = require('bluebird');
const { Pool } = require('pg');
require('dotenv').config();

const env = process.env;

const pool = new Pool ({
  user: env.PGUSERNAME,
  password: env.PGPASS,
  host: env.PGHOST,
  database: 'fambam',
  port: env.PGPORT,
});

const db = Promise.promisifyAll(pool, { multiArgs: true });

module.exports = db;