const Discord = require("discord.js");
const currency = require("../../models/currency");
const Toggle = require("../../models/toggle");

module.exports = {
  name: "nuggies",
  aliases: ["bal", "money"],
  run: (_, message, args, prefix, MongoToggle, theUser) => {
    Toggle.findOne(
      {
        ServerID: message.guild.id,
        Command: "Currency",
      },
      (err, toggle) => {
        if (err) console.log(err);
        if (!toggle) {
          const User = theUser || message.author
          currency.findOne(
            {
              UserID: User.id,
              ServerID: message.guild.id,
            },
            (err, user) => {
              if (!user) {
                message.reply(
                  'it seems like you/they havent started working yet. you/they acn use "k!work" to see available jobs'
                );
              } else {
                const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setTitle(`${User.tag.slice(0, -5)} has ${user.Nuggies} <:chickennuggie:706268265424355399>`)
                message.channel.send(embed)
                }
            }
          );
        } else {
          message.channel.send(
            'This server has the "Currency" module disabled'
          );
        }
      }
    );
  },
};
