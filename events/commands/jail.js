function restoreRoles(roles, member) {

  roles.forEach(role => {
    member.addRole(role)
    .catch(err => console.error(err));
  });
};

exports.run = (client, message, args) => {

  if (!message.member.hasPermission('KICK_MEMBERS')) return;

  if (message.content.toLowerCase().includes('s.jail')
    && message.mentions.members.first()) {

      let roles = [];
      const member = message.mentions.members.first();

      member.roles.forEach(role => {
        if (role.name !== '@everyone') {
          roles.push(role);
          member.removeRole(role);
        }
      });

      message.channel.send({
        embed: {
            color: 0xFFFF00,
            author: {
                name: `Sanction de ${message.author.username}`,
                icon_url: message.author.displayAvatarURL
            },
            description: `Retrait des rôles de ${member.user.username} pour 5 minutes`
        }
      });

      setTimeout(restoreRoles, 300000, roles, member);
  }

};
