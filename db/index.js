const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  ssl: true,
});

module.exports = {
  connect: () => {
    pool.connect()
      .then(client => {
        console.log('Connected to the database');
        client.release();
      })
      .catch(err => console.error('Error connecting to the database', err.stack)
        .then(() => pool.end()));
    return
  },
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
