const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  user: 'postgres.zynjcdzmoiwhudjghpsx',
  password: 'OsRKVP3PN2QoWNMA',
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
