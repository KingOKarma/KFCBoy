const Discord = require("discord.js")
const Rep = require("../../models/rep.js");
const Toggle = require("../../models/toggle.js");

module.exports = {
    name: 'whois',
    aliases: ["userinfo", "who"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Utility"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {



                    if (theUser) {
                        var targetUser = theUser

                    }


                    if (targetUser) {
                        Rep.findOne({

                            UserID: targetUser.id
                        },
                            (err, rep) => {
                                if (err) console.log(err);
                                if (targetUser.id === message.author.id) {
                                    NoMentionWho(message, rep)

                                    return

                                } else {
                                    MentionWho(message, targetUser, rep)
                                    return
                                }

                            })


                    } else {
                        Rep.findOne({

                            UserID: message.author.id
                        },
                            (err, rep) => {
                                if (err) console.log(err);


                                if (args[0] === undefined) {
                                    NoMentionWho(message, rep)

                                    return
                                }
                                else if (targetUser === undefined) {
                                    NoMentionWho(message, rep)
                                    return
                                }



                            })
                    }


                    function MentionWho(message, targetUser, rep) {


                        let embed = new Discord.MessageEmbed()
                            .setAuthor(targetUser.user.tag, targetUser.user.displayAvatarURL({ dynamic: true }))
                            .setThumbnail(`${targetUser.user.displayAvatarURL({ dynamic: true })}`)
                            .addField("[📄] User tag", `**${targetUser.user.tag}**`, true)
                            .addField("[🆔] User ID", `**${targetUser.user.id}**`, true)
                            .addField('[🌐] Presence', `**${targetUser.presence.status}**`,)
                            .addField('\u200b', '\u200b')
                            .addField(`[📆] Joined ${message.guild.name} at`, `**${targetUser.joinedAt.toLocaleString('en-US', { timezone: 'GMT' })}**`, true)
                            .addField(`[📃] Joined Discord at`, `**${targetUser.user.createdAt.toLocaleString('en-US', { timezone: 'GMT' })}**`, true)
                        if (!rep) {
                            embed.addField("[<:chickennuggie:706268265424355399>] Reputation", "**0**", true);
                            embed.addField('\u200b', '\u200b')

                        } else {
                            embed.addField("[<:chickennuggie:706268265424355399>] Reputation", `**${rep.rep}**`, true)
                            embed.addField('\u200b', '\u200b')

                        }
                        embed.addField("[🧮] Roles", `**${targetUser.roles.cache
                            .filter(r => r.id != message.guild.id)
                            .sort((a, b) => b.name < a.name)
                            .map(r => `<@&${r.id}>`).join(" ")
                            }**`)
                        embed.addField('\u200b', '\u200b')
                        embed.addField(`[📰] Permissions`, `${targetUser.permissions.toArray()
                            .join("**,** ")
                            .toLowerCase()
                            .replace(/_/gi, " ")
                            }`, true)
                        embed.setColor(message.guild.me.displayColor)
                        message.channel.send(embed);


                    }
                    function NoMentionWho(message, rep) {


                        Rep.findOne({

                            UserID: message.author.id
                        },
                            (err, rep) => {
                                if (err) console.log(err);
                                let embed = new Discord.MessageEmbed()
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
                                    .addField("[📄] User tag", `**${message.author.tag}**`, true)
                                    .addField("[🆔] User ID", `**${message.author.id}**`, true)
                                    .addField('[🌐] Presence', `**${message.member.presence.status}**`,)
                                    .addField('\u200b', '\u200b')
                                    .addField(`[📆] Joined ${message.guild.name} at`, `**${message.member.joinedAt
                                        .toLocaleString('en-US', { timezone: 'GMT' })}**`, true)
                                    .addField(`[📃] Joined Discord at`, `**${message.author.createdAt
                                        .toLocaleString('en-US', { timezone: 'GMT' })}**`, true)
                                if (!rep) {
                                    embed.addField("[<:chickennuggie:706268265424355399>] Reputation", "**0**", true);
                                    embed.addField('\u200b', '\u200b')


                                } else {
                                    embed.addField("[<:chickennuggie:706268265424355399>] Reputation", `**${rep.rep}**`, true)
                                    embed.addField('\u200b', '\u200b')

                                }
                                embed.addField("[🧮] Roles", `**${message.member.roles.cache
                                    .filter(r => r.id != message.guild.id)
                                    .sort((a, b) => b.name < a.name)
                                    .map(r => `<@&${r.id}>`).join(" ")
                                    }**`)
                                embed.addField('\u200b', '\u200b')
                                embed.addField(`[📰] Permissions`, `${message.member.permissions.toArray()
                                    .join("**,** ")
                                    .toLowerCase()
                                    .replace(/_/gi, " ")
                                    }`, true)
                                embed.setColor(message.guild.me.displayColor)
                                message.channel.send(embed);

                            })
                    }
                }
                if (toggle) return message.channel.send("This server has the \"Utility\" module disabled")
            })
    }
}