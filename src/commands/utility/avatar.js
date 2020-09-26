const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'avatar',
    aliases: ["av"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Utility"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    const embed = new Discord.MessageEmbed()


                    if (theUser) {
                        var targetUser = theUser.user

                    }


                    if (args[0] === undefined) {
                        embed
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setTitle(`**Your avatar is:**`)
                            .setImage(`${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                            .setColor(message.guild.me.displayColor)

                        message.channel.send(embed);
                        return
                    }
                    else if (targetUser === undefined) {
                        embed
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setTitle(`**Your avatar is:**`)
                            .setImage(`${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                            .setColor(message.guild.me.displayColor)

                        message.channel.send(embed);
                        return
                    } else if (theUser.id === message.author.id) {
                        embed
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setTitle(`**Your avatar is:**`)
                            .setImage(`${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                            .setColor(message.guild.me.displayColor)

                        message.channel.send(embed);
                        return

                    } else if (theUser.id === "614110037291565056") {
                        embed
                            .setAuthor(targetUser.tag, targetUser.displayAvatarURL({ dynamic: true }))
                            .setTitle(`**I mean.. my avatar is:**`)
                            .setImage(`${targetUser.displayAvatarURL({ dynamic: true })}?size=1024`)
                            .setColor(message.guild.me.displayColor)

                        message.channel.send(embed);
                        return

                    } else {
                        embed
                            .setAuthor(targetUser.tag, targetUser.displayAvatarURL({ dynamic: true }))
                            .setTitle(`**${targetUser.tag} avatar is:**`)
                            .setImage(`${targetUser.displayAvatarURL({ dynamic: true })}?size=1024`)
                            .setColor(message.guild.me.displayColor)

                        message.channel.send(embed);
                        return
                    }

                }
                if (toggle) return message.channel.send("This server has the \"Utility\" module disabled")
            })
    }
}