exports.run = (client, message, args) => {

  if (args.lenght < 1) return;

  args = args.slice(0).join(' ');

  message.delete();
  message.channel.send({
    embed: {
        color: 0xFFFF00,
        author: {
            name: `Idée de ${message.author.username}`,
            icon_url: message.author.displayAvatarURL
        },
        description: args
    }
  }).then((function (message) {
      message.react('❎');
      message.react('✅');
  })).catch(err => console.error(err));
};
