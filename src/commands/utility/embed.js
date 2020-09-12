const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'embed',
    aliases: ["eb"],
    run: (_, message, args) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Utility"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    let embed = new Discord.MessageEmbed()
                        .setAuthor(message.client.user.tag, message.client.user.displayAvatarURL())
                        .setDescription(args.join(' '))
                        .setColor(message.guild.me.displayColor)
                    message.channel.send(embed)



                }
                if (toggle) return message.channel.send("This server has the \"Utility\" module disabled")
            })


    }
}