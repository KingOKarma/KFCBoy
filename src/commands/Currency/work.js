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
<<<<<<< HEAD
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

=======
          currency.findOne(
            {
              ServerID: message.guild.id,
              UserID: message.author.id,
            },
            (err, user) => {
              work.findOne(
                {
                  ServerID: message.guild.id,
                  UserID: message.author.id,
                },
                (err, worker) => {
                  if (!args.length) {
                    if (!user) {
                      const newUser = new currency({
                        ServerID: message.guild.id,
                        UserID: message.author.id,
                        UserName: message.author.tag,

                      });
                      newUser.save().catch((err) => console.log(err));
                    }
                    if (!worker) {
                      var Thumbnail =
                        !message.guild.iconURL == undefined
                          ? "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                          : message.guild.iconURL;
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
                      message.channel.send(embed);
                    } else {
                      // gain nuggies if able to
                      if(stopWork.has(message.author.id)) {
                        message.channel.send("you have already worked once. come back later")
                      } else {
                        var gain = Math.ceil(Math.random() * (300 - 100) + 100)

                        user.Nuggies = user.Nuggies + gain;
                        user.UserName = message.author.tag
                        user.save().catch(err => console.log(err))
                        message.reply(`you earned ${gain} <:chickennuggie:706268265424355399>`)
                        stopWork.add(message.author.id);
                        setTimeout(() => {
                          stopWork.delete(message.author.id)
                        }, 1800000);
                      }
                    }
                  } else {
                    if(!worker) {
                      switch (args[0].toLowerCase()) {

                        case "fryer":
                          const newFryer = new work({
                            ServerID: message.guild.id,
                            UserID: message.author.id,
                            Work: "Fryer"
                          })
                          newFryer.save().catch(err => console.log(err))
                          message.reply("youre now working as a \"Chicken-nuggie fryer\"")
                          break;
                          
                          case "taste-tester":
                          const newTaster = new work({
                            ServerID: message.guild.id,
                            UserID: message.author.id,
                            Work: "Taste"
                          })
                          newTaster.save().catch(err => console.log(err))
                          message.reply("youre now working as a \"Chicken-nuggie taste tester\"")
                          break;

                          case "inspector":
                          const newInspector = new work({
                            ServerID: message.guild.id,
                            UserID: message.author.id,
                            Work: "Inspector"
                          })
                          newInspector.save().catch(err => console.log(err))
                          message.reply("youre now working as a \"Chicken-nuggie inspector\"")
                          break;
>>>>>>> a7b7c70e3d31109088a8e360067219eb5fa1e4f2

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
