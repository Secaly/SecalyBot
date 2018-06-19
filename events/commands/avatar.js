exports.run = (client, message, args) => {

  message.channel.send(message.mentions.members.first().user.displayAvatarURL)
  .catch(err => console.error(err));
};
