const Discord = require('discord.js');

exports.run = (client, message, args) => {

  if (args.lenght < 1) return;

  args = args.slice(0).join(' ');

  message.delete().catch(err => console.error(err));
  message.channel.send({
    embed: {
      color: 0xFFFF00,
      author: {
        name: `Spoil de ${message.author.username}, cliquez pour recevoir le message`,
        icon_url: message.author.displayAvatarURL
      }
    }
  })
  .then(message => {
    message.react('✅');
    message.createReactionCollector((reaction, user) =>
      !user.bot && reaction.emoji.name === '✅'
    )
    .on('collect', reaction => {
      reaction.users.last().send(args);
    });
  })
  .catch(err => console.error(err));
};
