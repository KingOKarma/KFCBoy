const Discord = require("discord.js");
const Toggle = require("../../models/toggle");
const currency = require("../../models/currency");
const work = require("../../models/work");
const stopWork = new Set();
const date = new Date();

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

                          
                          
                      
                        default:
                          message.channel.send("not a valid job or action")
                          break;
                      }
                      
                    } else {
                      message.channel.send("please dont stress yourself. 1 work place is enough")
                    }
                  }
                }
              );
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
