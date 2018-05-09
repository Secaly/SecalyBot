const discord = require('discord.js');
const { Client } = require('pg');
const client = new discord.Client();

const database = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

database.connect();

database.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  database.end();
});

client.on('ready', function() {
  console.log('Bot ready');
});

client.login(process.env.BOT_TOKEN)
  .then(() => console.log('Login succesful'))
  .catch(console.error);
