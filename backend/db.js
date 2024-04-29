const { Pool } = require('pg');
require('dotenv/config');

const host = process.env.HOST_DB;
const user = process.env.USER_DB;
const database = process.env.DATABASE_DB;
const password = process.env.PASS_DB;
const port = process.env.PORT_DB;

const pool = new Pool({
  host: host,
  database: database,
  user: user,
  password: password,
  port: port,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
