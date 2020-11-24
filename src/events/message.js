const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("../config.json");
const mongoose = require("mongoose");
const Toggle = require("../models/toggle.js");
const Xp = require("../models/xp.js");
const globalXp = require("../models/globalXp");

//Global xp timeout
const GlobalDelayset = new Set();

//guild xp timeout
const delaySet = new Set();

//auto responders timeout
const usedCommandRecentllyk = new Set();
const usedCommandRecentllypp = new Set();
const usedCommandRecentllye = new Set();
module.exports = {
  name: "message",
  run: async (bot, message) => {
    // if channel is in ingnored category return
    //if(bot.noResponseCats.has(message.channel.parentID)) return;

    //if message is in a channel not dm

    if (message.channel.type != "dm") {
      //ping help

      const LogChannel = message.client.channels.cache.get(
        "700438892888719501"
      );

      if (message.content.toLowerCase() === "<@!614110037291565056>") {
        message.channel
          .send(
            `My prefix is \`${
              bot.prefix.get(message.guild.id) || "k!"
            }\` you can use \`${
              bot.prefix.get(message.guild.id) || "k!"
            }help\` to view my commands (make sure dms are enabled so i can dm you the commands!)`
          )
          .catch((err) => {
            console.log(
              `Error, \"Ping Help\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`
            );
            const ErrorEmbed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setColor("0xFF0000")
              .setDescription(
                `\`\`\`Error, \"Ping Help\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``
              )
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
              .setFooter(
                `This bot was brought to you by King Of Karma#0069`,
                `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`
              );
            LogChannel.send(ErrorEmbed);
          });
      }

      //ping
      const responseTime = Math.round(Date.now() - message.createdTimestamp); // This will round the response time between when the message was received and when the message was sent

      //You can display as
      if (message.content.startsWith(`${config.prefix}ping`)) {
        message
          .delete()
          .catch((err) => console.log(err + "someone's ping perm go brr"));
        const pingf = await message.channel
          .send(`🏓 Pinging....`)
          .catch((err) => {
            const LogChannel = message.client.channels.cache.get(
              "700438892888719501"
            );

            console.log(
              `Error, \"Ping\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`
            );
            ErrorEmbed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setColor("0xFF0000")
              .setDescription(
                `\`\`\`Error, \"Ping\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``
              )
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
              .setFooter(
                `This bot was brought to you by King Of Karma#0069`,
                `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`
              );
            LogChannel.send(ErrorEmbed);
          });

        if (pingf === undefined) return;

        pingf.edit(`**Ping**🏓\n**Response time is:** ${responseTime}ms`);
      }

      //auto responders

      if (message.channel.type == "dm") {
        return;
      } else {
        Toggle.findOne(
          {
            ServerID: message.guild.id,
            Command: "Response",
          },
          (err, toggle) => {
            if (err) console.log(err);
            if (!toggle) {
              const LogChannel = message.client.channels.cache.get(
                "700438892888719501"
              );

              if (message.content.toLowerCase() === "k") {
                if (usedCommandRecentllyk.has(message.author.id)) {
                } else {
                  message.channel
                    .send('Did you seriously just **"k"** BRUH :eyes:')
                    .catch((err) => {
                      console.log(
                        `Error, \"K\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`
                      );
                      ErrorEmbed = new Discord.MessageEmbed()
                        .setAuthor(
                          message.author.tag,
                          message.author.displayAvatarURL({ dynamic: true })
                        )
                        .setColor("0xFF0000")
                        .setDescription(
                          `\`\`\`Error, \"K\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``
                        )
                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                        .setFooter(
                          `This bot was brought to you by King Of Karma#0069`,
                          `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`
                        );
                      LogChannel.send(ErrorEmbed);
                    });

                  usedCommandRecentllyk.add(message.author.id);
                  setTimeout(() => {
                    usedCommandRecentllyk.delete(message.author.id);
                  }, 3000);
                }
              }
              if (message.content.toLowerCase() === "pp") {
                if (usedCommandRecentllypp.has(message.author.id)) {
                } else {
                  message.channel.send("My PP hurts man 🍆💦").catch((err) => {
                    console.log(
                      `Error, \"PP\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`
                    );
                    ErrorEmbed = new Discord.MessageEmbed()
                      .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL({ dynamic: true })
                      )
                      .setColor("0xFF0000")
                      .setDescription(
                        `\`\`\`Error, \"PP\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``
                      )
                      .setThumbnail(message.guild.iconURL({ dynamic: true }))
                      .setFooter(
                        `This bot was brought to you by King Of Karma#0069`,
                        `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`
                      );
                    LogChannel.send(ErrorEmbed);
                  });

                  usedCommandRecentllypp.add(message.author.id);
                  setTimeout(() => {
                    usedCommandRecentllypp.delete(message.author.id);
                  }, 3000);
                }
              }
              if (message.content.toLowerCase() === "e") {
                if (usedCommandRecentllye.has(message.author.id)) {
                } else {
                  message.channel
                    .send(
                      "https://www.dailydot.com/wp-content/uploads/2018/04/markiplierebig.png"
                    )
                    .catch((err) => {
                      console.log(
                        `Error, \"E\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`
                      );
                      ErrorEmbed = new Discord.MessageEmbed()
                        .setAuthor(
                          message.author.tag,
                          message.author.displayAvatarURL({ dynamic: true })
                        )
                        .setColor("0xFF0000")
                        .setDescription(
                          `\`\`\`Error, \"E\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``
                        )
                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                        .setFooter(
                          `This bot was brought to you by King Of Karma#0069`,
                          `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`
                        );
                      LogChannel.send(ErrorEmbed);
                    });
                  usedCommandRecentllye.add(message.author.id);
                  setTimeout(() => {
                    usedCommandRecentllye.delete(message.author.id);
                  }, 3000);
                }
              }
            }
            if (toggle) return;
          }
        );
      }

      //guild xp system
      Toggle.findOne(
        {
          ServerID: message.guild.id,
          Command: "Xp",
        },
        (err, toggle) => {
          if (message.author.bot) return;
          if (err) console.log(err);
          if (!toggle) {
            let xpGain = Math.ceil(message.content.length / 2);

            // if above 10, add 10
            if (xpGain > 11) {
              xpGain = Math.ceil(+10);
            }
            Xp.findOne(
              {
                ServerID: message.guild.id,
                UserID: message.author.id,
              },
              (err, xp) => {
                if (err) console.log(err);

                if (!xp) {
                  const newUser = new Xp({
                    UserID: message.author.id,
                    ServerID: message.guild.id,
                    xp: xpGain,
                    level: 0,
                    UserName: message.author.tag,
                    ServerName: message.guild.name,
                  });
                  newUser.save().catch((err) => console.log(err));
                } else if (xp.xp + xpGain >= xp.level + xp.level * 200 * 2) {
                  if (delaySet.has(message.author.id)) {
                  } else {
                    const levelEmbed = new Discord.MessageEmbed();
                    xp.xp = xp.xp + xpGain;
                    xp.level = xp.level + 1;
                    xp.UserName = message.author.tag;
                    xp.ServerName = message.guild.name;
                    xp.save().catch((err) => console.log(err));
                    console.log(
                      `${message.author.tag} has ${xp.xp}xp and gained ${xpGain}xp, they are level ${xp.level}\n\n in the server "${message.guild.name}" and leveled up with the message\n\n${message.content}\n\n`
                    );
                    levelEmbed
                      .setTitle(`Leveled up to ${xp.level}`)
                      .setColor(message.guild.me.displayColor)
                      .setTimestamp()
                      .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL({ dynamic: true })
                      );
                    message.channel
                      .send(levelEmbed)
                      .catch(() =>
                        message.reply(
                          `Congrats ${message.author.tag}! you're now level ${xp.level}`
                        )
                      )
                      .catch(() => {});

                    delaySet.add(message.author.id);

                    setTimeout(() => {
                      delaySet.delete(message.author.id);
                    }, 10000); //10 seconds till next xp add
                  }
                } else {
                  if (delaySet.has(message.author.id)) {
                  } else {
                    xp.xp = xp.xp + xpGain;
                    xp.UserName = message.author.tag;
                    xp.ServerName = message.guild.name;

                    xp.save().catch((err) => console.log(err));

                    delaySet.add(message.author.id);

                    setTimeout(() => {
                      delaySet.delete(message.author.id);
                    }, 10000);
                  }
                }
              }
            );
          }
          if (toggle) return;
        }
      );

      //global xp
      let xpGain = Math.ceil(message.content.length / 2);

      // if above 50, add 50
      if (xpGain > 11) {
        xpGain = Math.ceil(+10);
      }

      globalXp.findOne({ UserID: message.author.id }, (err, user) => {
        if (message.author.bot) return;

        if (!user) {
          const newGlobalXp = new globalXp({
            UserID: message.author.id,
            userName: message.author.tag,
            xp: xpGain,
            level: 0,
          });
          newGlobalXp.save().catch((err) => console.log(err));
        } else if (user.xp + xpGain >= user.level * 200 * 2) {
          user.xp = user.xp + xpGain;
          user.level = user.level + 1;
          user.UserName = message.author.tag;
          user.save().catch((err) => console.log(err));
          console.log(
            `${message.author.tag} has ${user.xp}xp and gained ${xpGain}xp, they are level ${user.level} globally\n\n in the server "${message.guild.name}" and leveled up with the message\n\n${message.content}\n\n`
          );
        } else {
          if (GlobalDelayset.has(message.author.id)) {
          } else {
            user.xp = user.xp + xpGain;
            user.UserName = message.author.tag;
            user.ServerName = message.guild.name;
            user.save().catch((err) => console.log(err));

            GlobalDelayset.add(message.author.id);

            setTimeout(() => {
              GlobalDelayset.delete(message.author.id);
            }, 10000);
          }
        }
      });

      //if message is in dm!
    } else {
      // if (message.author.id == "642168897625260052") return message.author("you have been banned from sending feedback, please contact the dev if you wish to regain access");
      if (message.author.bot) return;

      const karmakingdom = message.client.guilds.cache.find(
        (guild) => guild.id === "605859550343462912"
      );

      const channel = karmakingdom.channels.cache.find(
        (channel) => channel.id === "699030000753442867"
      );

      //yes its nested if statements, im lazy
      if (message.content.toLowerCase() == "dev") {
        message.author
          .send(
            `**Hello ${message.author.tag}! Would you like to send feedback to the dev?**\n*Please either answer with "yes" or "no".*`
          )
          .then(() => {
            const collector = new Discord.MessageCollector(
              message.channel,
              (m) => m.author.id === message.author.id
            );
            collector.once("collect", (message) => {
              if (message.content.toLowerCase() == "yes") {
                message.channel
                  .send(
                    `**Just to clarify one more time, as this goes into a public server are you 100% sure?**\n*Please either answer with "yes" or "no".*`
                  )
                  .then(() => {
                    const collector2 = new Discord.MessageCollector(
                      message.channel,
                      (m) => m.author.id === message.author.id
                    );
                    collector2.once("collect", (message) => {
                      if (message.content.toLowerCase() == "yes") {
                        message.channel
                          .send(
                            `**Alrighty we're all set, just type out your feedback and it will be sent, no going back now 👀**`
                          )
                          .then(() => {
                            const collector4 = new Discord.MessageCollector(
                              message.channel,
                              (m) => m.author.id === message.author.id
                            );
                            collector4.once("collect", (message) => {
                              const feedback = message.content;
                              message.channel.send(
                                `> **Your message has been sent to the support server at <https://discord.gg/2aSaqAg> **\n~~**This bot was brought to you by King Of Karma#0069**~~`
                              );
                              const embed = new Discord.MessageEmbed()
                                .setAuthor(
                                  message.author.tag,
                                  message.author.displayAvatarURL({
                                    dynamic: true,
                                  })
                                )
                                .setColor("0x36cbf5")
                                .setThumbnail(
                                  message.author.displayAvatarURL({
                                    dynamic: true,
                                  })
                                )
                                .setDescription(
                                  `**${message.author.tag} has suggested:**`
                                )
                                .addField("\u200b", `${feedback}`)
                                .setFooter(
                                  `You can dm the bot "dev" to send feedback`
                                );
                              channel.send(embed);
                            });
                          });
                      } else {
                        message.channel.send(
                          `**Aight that wasn't a \`yes\`...so enjoy the rest of your day!**`
                        );
                      }
                    });
                  });
              } else {
                message.channel.send(
                  `**That was not a \`yes\` so Bye Bye then!**`
                );
              }
            });
          });
      }
    }
  },
};
