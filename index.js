const discord = require('discord.js');

const client = new discord.Client();

client.on('ready', function() {
  console.log('Bot ready');
});

client.login(process.env.BOT_TOKEN)
  .then(() => console.log('Login succesful'))
  .catch(console.error);
