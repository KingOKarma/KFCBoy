const Discord = require("discord.js")
const mongoose = require("mongoose");
const Rep = require("../../models/rep.js");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 



module.exports = {
    name: `viewrep`,
    aliases: ["repview"],
    run: async (_, message, args, bot, prefix) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Interactable"
        },
            (err, toggle) => {
                if (err) console.log(err);
                if (!toggle) {



                    let targetUser = message.guild.member(message.mentions.users.first());


                    if (targetUser) {
                        Rep.findOne({

                            UserID: targetUser.id
                        },
                            (err, rep) => {
                                if (err) console.log(err);
                                let repEmbed = new Discord.MessageEmbed()
                                    .setAuthor(targetUser.user.tag, targetUser.user.displayAvatarURL({ dynamic: true }))
                                    .setColor(message.guild.me.displayColor)
                                    .setThumbnail(targetUser.user.displayAvatarURL({ dynamic: true }))
                                    .setTitle(`${targetUser.displayName} Reputation:`)

                                if (!rep) {
                                    repEmbed.addField("Reputation", "0", true);
                                    return message.channel.send(repEmbed);

                                } else {
                                    repEmbed.addField("Reputation", rep.rep, true)
                                    return message.channel.send(repEmbed);

                                }

                            })
                    }

                    else {
                        Rep.findOne({

                            UserID: message.author.id
                        },
                            (err, rep) => {
                                if (err) console.log(err);
                                let repEmbed = new Discord.MessageEmbed()
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                    .setColor(message.guild.me.displayColor)
                                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                    .setTitle(`${message.member.displayName} Reputation:`)

                                if (!rep) {
                                    repEmbed.addField("Reputation", "0", true);
                                    return message.channel.send(repEmbed);

                                } else {
                                    repEmbed.addField("Reputation", rep.rep, true)
                                    return message.channel.send(repEmbed);

                                }

                            })
                    }
                }
                if (toggle) return message.channel.send("This server has the \"Interactable\" module disabled")
            })

    }
}