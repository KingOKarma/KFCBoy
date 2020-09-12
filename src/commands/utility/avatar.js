const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'avatar',
    aliases: ["av"],
    run: (_, message, args, prefix) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Utility"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    const embed = new Discord.MessageEmbed()
                    mention = message.mentions.users.first();




                    if (args[1] = mention) {
                        embed
                            .setAuthor(mention.tag, mention.displayAvatarURL({ dynamic: true }))
                            .setTitle('**Users Avatar and ID is:**')
                            .addField(mention.id, mention)
                            .setImage(`${mention.displayAvatarURL({ dynamic: true })}?size=1024`)
                            .setColor(message.guild.me.displayColor)

                        message.channel.send(embed);
                    }





                    if (args[1] == null) {
                        embed
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setTitle('**Your Avatar is:**')
                            .addField(message.author.id, message.author)
                            .setImage(`${message.author.displayAvatarURL({ dynamic: true })}?size=1024`)
                            .setColor(message.guild.me.displayColor)

                        message.channel.send(embed);
                    }

                }
                if (toggle) return message.channel.send("This server has the \"Utility\" module disabled")
            })
    }
}