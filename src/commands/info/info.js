const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const { endianness } = require("os");
const { exit } = require("process");
const config = require('../../config.json');



module.exports = {
    name: 'info',
    aliases: ["botinfo", "bot"],
    run: (_, message, args, bot) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")


        // let repadd = "On"
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Info"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    // case true: {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User/Bot Information')
                        .setThumbnail(`${message.guild.iconURL({ dynamic: true })}?size=1024`)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setColor(message.guild.me.displayColor)
                        if (message.guild)
                        embed.setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}?size=1024.png`)
                        .addField('Current Server -', message.guild.name, true)
                        .addField(`Your ID -`, message.author.id, true)
                        .addField('Serving -', `${message.client.users.cache.size} users`, true)
                        .addField('Looking at -', `${message.client.channels.cache.size} channels`, true)
                        .addField('Working inside -', `${message.client.guilds.cache.size} servers`, true)
                    message.channel.send(embed);

                }
                if (toggle) return message.channel.send("This server has the \"Info\" module disabled")

            })







    }
}
