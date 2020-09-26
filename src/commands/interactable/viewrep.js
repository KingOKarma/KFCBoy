const Discord = require("discord.js")
const Rep = require("../../models/rep.js");
const Toggle = require("../../models/toggle.js");



module.exports = {
    name: `viewrep`,
    aliases: ["repview"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Interactable"
        },
            (err, toggle) => {
                if (err) console.log(err);
                if (!toggle) {


                    if (theUser) {
                        var targetUser = theUser.user
                    }


                    if (targetUser) {
                        Rep.findOne({

                            UserID: targetUser.id
                        },
                            (err, rep) => {
                                if (err) console.log(err);
                                let repEmbed = new Discord.MessageEmbed()
                                    .setAuthor(targetUser.tag, targetUser.displayAvatarURL({ dynamic: true }))
                                    .setColor(message.guild.me.displayColor)
                                    .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
                                    .setTitle(`${targetUser.tag} Reputation:`)

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