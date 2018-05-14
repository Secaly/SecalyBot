const discord = require('discord.js');
const client = new discord.Client();
const db = require('./db')
const fs = require('fs');


client.on('ready', function() {
  console.log('Bot ready');

  db.connect();

  db.query('CREATE TABLE IF NOT EXISTS users( \
    id TEXT PRIMARY KEY, \
    warn INTEGER DEFAULT 0)')
    .then(res => console.log(res))
    .catch(err => console.error(err));
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (fs.lstatSync(`./events/${file}`).isFile()) {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split('.')[0];
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    }
  });
});

client.login(process.env.BOT_TOKEN)
  .then(() => console.log('Login succesful'))
  .catch(console.error);
