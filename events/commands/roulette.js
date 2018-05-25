exports.run = (client, message, args) => {

  args = args.slice(0).join(' ');

  random = message.channel.guild.members.random();

  message.channel.send(`***${random.user.username}*** ${args}`)
  .catch(err => console.error(err));
};
