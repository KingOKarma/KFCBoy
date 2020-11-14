const Discord = require("discord.js");
const Toggle = require("../../models/toggle");
const currency = require("../../models/currency");
const stopWork = new Set();
var utils = require("../../utils/smartUtils");
var timeout = new Set();
var jobtimeout = new Set();
var leaveMessages = [
  "Your boss was happy that you left bc you didnt really do that much work",
  "Your boss begged you to stay but you were to much of a savage to care",
  "You have left your job even tho you didnt really have enough money to live life. So you start to think that you might need to become homeless to stay alive",
  "Im happy that you left. You just produced wayyy to many nuggies for us to keep up with the sales",
  "Wow you just left that place like it was nothing",
  "You got so emotional while resigning from your job. that your boss wanted to give you a rise, but you went all cry mode and ran out of your boss' office and never came back",
  "You told your boss that he was a dick and he fired you on the spot"
];

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

        let guildicon = message.guild.iconURL({ dynamic: true });
        if (!message.guild.iconURL()) {
          guildicon =
            "https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png";
        }

        if (!toggle) {
          currency.findOne(
            { UserID: message.author.id, ServerID: message.guild.id },
            (err, user) => {
              if (err) return utils.logErr(message, err);
              if (!args[0]) {
                if (!user || user.work === "") {
                  var embed = new Discord.MessageEmbed()
                    .setTitle("Heres the current list of jobs")
                    .setAuthor(
                      message.author.tag,
                      message.author.displayAvatarURL
                    )
                    .setThumbnail(guildicon)
                    .addField(
                      "jobs list",
                      "Chicken Nuggie fryer\nChicken nuggie inspector\nChicken nuggie taste tester\n",
                      true
                    )
                    .addField(
                      "Job nickname",
                      "Fryer\nInspector\ntaste-tester\n\n",
                      true
                    )
                    .setFooter(
                      '\nTo "apply" for a job use "k!work [Work nickname here]"'
                    );
                  message.channel.send(embed);
                } else {
                  var earnings = Math.round(Math.random() * (300 - 50) + 50);
                  // some day do
                  //if (user.premium) {
                  //  earnings = earnings * 2
                  //}
                  user.Nuggies = user.Nuggies + earnings;
                  user.save().catch((err) => utils.logErr(message, err));
                  message.channel.send(`you earned ${earnings} <:chickennuggie:706268265424355399>`);
                }
              } else {
                switch (args[0].toLowerCase()) {
                  
                  case "fryer":
                    if(jobtimeout.has(message.author.id)) return message.channel.send("you cannot apply for a job yet please wait atleast 6 hours after leaving a job");
                    if (!user) {
                      var newfryer = new currency({
                        UserID: message.author.id,
                        ServerID: message.guild.id,
                        work: "fryer",
                      });
                      newfryer
                        .save()
                        .catch((err) => utils.logErr(message, err));
                      message.channel.send("Your application as Fryer has been accepted. Welcome")
                    } else if (user.work != "") {
                      message.channel.send(
                        `As much as we would love to hire you as a fryer you already got a job at ${user.work}`
                      );
                    } else {
                      user.work = "Fryer";
                      user.save().catch((err) => utils.logErr(message, err));
                      message.channel.send("Your application as Fryer has been accepted. Welcome")
                    }
                    break;

                  case "inspector":
                    if(jobtimeout.has(message.author.id)) return message.channel.send("you cannot apply for a job yet please wait atleast 6 hours after leaving a job");
                    if (!user) {
                      var newInspector= new currency({
                        UserID: message.author.id,
                        ServerID: message.guild.id,
                        work: "inspector",
                      });
                      newInspector
                        .save()
                        .catch((err) => utils.logErr(message, err));
                      message.channel.send("Your application as Inspector has been accepted. Welcome")
                    } else if (user.work != "") {
                      message.channel.send(
                        `As much as we would love to hire you as a inspector you already got a job at ${user.work}`
                      );
                    } else {
                      user.work = "Fryer";
                      user.save().catch((err) => utils.logErr(message, err));
                      message.channel.send("Your application as Inspector has been accepted. Welcome")
                    }
                    break;

                  case "taste-tester":
                    if(jobtimeout.has(message.author.id)) return message.channel.send("you cannot apply for a job yet please wait atleast 6 hours after leaving a job");
                    if (!user) {
                      var newtaster = new currency({
                        UserID: message.author.id,
                        ServerID: message.guild.id,
                        work: "taste-tester",
                      });
                      newtaster
                        .save()
                        .catch((err) => utils.logErr(message, err));
                      message.channel.send("Your application as taste tester has been accepted. Welcome")
                    } else if (user.work != "") {
                      message.channel.send(
                        `As much as we would love to hire you as a taste-tester you already got a job at ${user.work}`
                      );
                    } else {
                      user.work = "taste-tester";
                      user.save().catch((err) => utils.logErr(message, err));
                      message.channel.send("Your application as taste tester has been accepted. Welcome")
                    }
                    break;
                  case "help":
                    break;
                  case "leave":
                    if (user.work == "") {
                      message.channel.send("You dont have a job yet");
                    } else {
                      user.work = "";
                      user.save().catch((err) => utils.logErr(err));
                      message.channel.send(leaveMessages[Math.floor(Math.random() * leaveMessages.length)]);
                      jobtimeout.add(message.author.id)
                      setTimeout(() => {
                        jobtimeout.delete(message.author.id)
                      }, 2160000);
                    }
                    break;

                  default:
                    message.channel.send(
                      "Invalid action use `k!work help` for more information"
                    );
                    break;
                }
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
