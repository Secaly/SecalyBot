const axios = require('axios');

const textReplace = (text) => {
  return text.replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#039;/g, "'");
}

const getResult = (reactions, correctAnswer) => {
  return new Promise((resolve, reject) => {
    let winners = [];
    let losers = [];
    reactions.map(reaction => {
      if (correctAnswer === 'True') {
        if (reaction.emoji.name === '✅') {
          reaction.users.map(user =>
            winners.push(user.username)
          )
        } else {
          reaction.users.map(user =>
            losers.push(user.username)
          )
        }
      } else if (correctAnswer === 'False') {
        if (reaction.emoji.name === '❎') {
          reaction.users.map(user =>
            winners.push(user.username)
          )
        } else {
          reaction.users.map(user =>
            losers.push(user.username)
          )
        }
      }
    });
    winners = winners.filter(winner => losers.every(loser => winner != loser));
    losers = losers.filter(loser => loser != 'SecalyBot Test');
    resolve({winners, losers});
  });
}

exports.run = (client, message, args) => {

  axios.get('https://opentdb.com/api.php?amount=1&type=boolean')
    .then(function(get) {
      get.data.results.forEach(result => {
        message.channel.send({
          embed: {
              color: 0xFFFF00,
              author: {
                  name: `${result.category}`,
                  icon_url: message.author.displayAvatarURL
              },
              description: `${textReplace(result.question)}`,
          }
        })
        .then(post => {
            post.react('❎');
            post.react('✅');
            return(post);
        })
        .then(post => {
          const filter = (reaction, user) =>
            (reaction.emoji.name === '❎' || reaction.emoji.name === '✅')
            && user.bot
          post.awaitReactions(filter, { time: 10000 })
          .then(reactions => {
            getResult(reactions, result.correct_answer)
            .then(quizzResult => {
              message.channel.send({
                embed: {
                  color: 0xFFFF00,
                  author: {
                    name: `${result.correct_answer === 'True' ?
                      'Vrai !' : 'Faux !' }`,
                    icon_url: message.author.displayAvatarURL
                  },
                  fields: [{
                    "name": "Bonne réponse",
                    "value": `${quizzResult.winners.length === 0 ?
                      'Personne' : quizzResult.winners.map(x => x).join('\n')}`
                  },
                  {
                    "name": "Mauvaise réponse",
                    "value": `${quizzResult.losers.length === 0 ?
                      'Personne' : quizzResult.losers.map(x => x).join('\n')}`
                  }]
                }
              })
            })
          })
          .catch(console.error);
        })
        .catch(err => console.error(err));
      })
    })
    .catch(err =>
      message.channel.send({
        embed: {
            color: 0xFFFF00,
            author: {
                name: `Un soucis est survenu !`,
                icon_url: message.author.displayAvatarURL
            },
            description: 'https://opentdb.com ne semble pas répondre.',
        }
      })
      .catch(err => console.error(err))
    );
};
