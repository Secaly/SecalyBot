const db = require('./../db')


exports.run = (() => {

  console.log('Bot ready');

  db.connect();

  db.query('CREATE TABLE IF NOT EXISTS users( \
    id TEXT PRIMARY KEY, \
    warn INTEGER DEFAULT 0)')
    .then(res => console.log(res))
    .catch(err => console.error(err));
});
