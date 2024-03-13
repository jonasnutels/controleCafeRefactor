const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres.cba0o8s0y1xs.us-east-1.rds.amazonaws.com',
  database: 'postgres',
  user: 'postgres',
  password: 'UJDXCubcMQDUYVvj0in7',
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
