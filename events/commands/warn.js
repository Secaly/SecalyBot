const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const db = require('../../db')


exports.run = (client, message, args) => {

  if (message.author.bot) return;

  if (!message.member.hasPermission('BAN_MEMBERS')) return;

  if (message.content.toLowerCase().includes('s.warn')
    && message.mentions.members.first()) {

    db.query('UPDATE users SET warn = warn + 1 WHERE id = $1',
      [message.mentions.members.first().id],
      (error, result) => {
        if (error) {
          console.log(`Error : ${error}`)
        } else {
          if (result.rowCount === 0) {
            db.query('INSERT INTO users (id, warn) VALUES ($1, 1)',
              [message.mentions.members.first().id],
              (error, result) => {
                if (error) {
                  console.log(`Error : ${error}`)
                }
              }
            )
          }
        };

        db.query('SELECT warn FROM users WHERE id = $1',
          [message.mentions.members.first().id],
          (error, result) => {
            if (error) {
              console.log(`Error : ${error}`)
            } else {
              let embed = new Discord.RichEmbed()
                .setTitle(
                  `Avertissement pour
                  ${message.mentions.members.first().user.username}`
                )
                .setAuthor(
                  `${message.author.username}`, `${message.author.avatarURL}`
                )
                .setColor(0xEF5350)
                .setDescription(
                  "```Nombre d'avertissement : " + result.rows[0].warn + "```"
                )
                .setThumbnail(message.mentions.members.first().avatarURL);
              message.channel.send(embed);
          }
        })
      }
    )
  };
};
