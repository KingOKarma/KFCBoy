const Discord = require("discord.js")
const Toggle = require("../../models/toggle");
const words = require('../../blacklist/words/blacklist.json');

module.exports = {
  name: "capitalize",
  aliases: [""],
  run: (_, message, args) => {
    Toggle.findOne(
      {
        ServerID: message.guild.id,
        Command: "Fun",
      },
      (err, toggle) => {
        if (err) console.log(err);
        if (!toggle) {
          var sentence = args.join(" ").split("");
          var capitalized = [];
          const blocked = words.words.filter((word) =>
            message.content.toLowerCase().includes(word)
          );
          if (blocked.length > 0) {
            sentence = "i said a very naugty word".split("");
          }
          sentence.forEach(char => {
            if (Math.random() < 0.5) {
              capitalized = capitalized + char.toUpperCase();
            } else {
              capitalized = capitalized + char
            }
          });
          const embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} said:`)
          .setDescription(capitalized)
          .setColor(message.guild.me.displayColor)
          .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}));
          message.channel.send(embed)
        } else {
          message.channel.send('This server has the "Fun" module disabled');
        }
      }
    );
  },
};
