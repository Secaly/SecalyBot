exports.run = (client, message) => {

  if (message.author.bot) return;

  if (message.content.indexOf('s.')  === 0) {

    const args = message.content.slice(2).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
  };
};
