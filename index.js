const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');


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
