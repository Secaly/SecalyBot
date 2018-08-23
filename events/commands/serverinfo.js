exports.run = (client, message, args) => {

  if (message.guild.available) {

    guildMembers = message.guild.members;

    message.channel.send({
      embed: {
        color: 0xFFFF00,
        author: {
            name: `${message.guild.name}`,
        },
        fields: [{
            name: "Server Owner",
            value: `${message.guild.owner}`
          },{
            name: "ID",
            value: `${message.guild.id}`
          },{
            name: "Members",
            value: `${message.guild.memberCount}`
          },{
            name: "Humans",
            value: `${message.guild.members
              .filter(member => member.user.bot === false).size}`
          },{
            name: "Bots",
            value: `${message.guild.members
              .filter(member => member.user.bot === true).size}`
          },{
            name: "Online",
            value: `${message.guild.members
              .filter(member => member.user.presence.status === "online")
              .size}`
          }
        ]
      }
    })
  }
};
