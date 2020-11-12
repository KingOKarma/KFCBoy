const Discord = require("discord.js");
const Toggle = require("../../models/toggle");
const currency = require("../../models/currency");
const stopWork = new Set();
var utils = require('../../utils/smartUtils');


/* WORK EMBED
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL
        )
        .setThumbnail(Thumbnail)
        .addField(
          "jobs list",
          "Chicken Nuggie fryer\nChicken nuggie inspector\nChicken nuggie taste tester\n",
          true
        )
        .addField(
          "job nickname",
          "Fryer\nInspector\ntaste-tester\n\n",
          true
        )
        .setFooter(
          '\nto "apply" for a job use k!work [Work nickname here]'
        );
*/

module.exports = {
  name: "work",
  run: (_, message, args) => {
    Toggle.findOne(
      {
        ServerID: message.guild.id,
        Command: "Currency",
      },
      (err, toggle) => {
        if (err) console.log(err);
        if (!toggle) {
          currency.findOne({UserID: message.author.id, ServerID: message.guild.id}, (err, user) => {
            if(err) return utils.logErr(message, err);
            if(!args[0]) {
              if(!user || user.work === "") {
                var embed = new Discord.MessageEmbed()
                .setTitle("heres the current list of jobs")
                .setAuthor(
                  message.author.tag,
                  message.author.displayAvatarURL
                )
                .setThumbnail(Thumbnail)
                .addField(
                  "jobs list",
                  "Chicken Nuggie fryer\nChicken nuggie inspector\nChicken nuggie taste tester\n",
                  true
                )
                .addField(
                  "job nickname",
                  "Fryer\nInspector\ntaste-tester\n\n",
                  true
                )
                .setFooter(
                  '\nto "apply" for a job use \"k!work [Work nickname here]\"'
                );
                message.channel.send(embed)
              } else {
                var earnings = Math.round(Math.random() * (300 - 50) + 50);
                // some day do 
                //if (user.premium) {
                //  earnings = earnings * 2
                //}
                user.Nuggies = user.Nuggies + earnings;
                user.save().catch(err => utils.logErr(message, err))
                message.channel.send(earnings)
              }


            } else {
              switch (args[0]) {
                case "fryer":
                    if(!user) {
                      var newfryer = new currency({
                        UserID: message.author.id,
                        ServerID: message.guild.id,
                        work: "fryer"
                      })
                      newfryer.save().catch(err => utils.logErr(message, err))
                    } else if(user.work != "") {
                      message.channel.send(`as much as we would love to hire you as a fryer you already got a job at ${user.work}`)
                    } else {
                      user.work == "Fryer"
                      user.save().catch(err => utils.logErr(message, err));
                    }
                  break;
              
                default:
                  break;
              }
            }
          })
        } else {
          message.channel.send(
            'This server has the "Currency" module disabled'
          );
        }
      }
    );
  },
};
