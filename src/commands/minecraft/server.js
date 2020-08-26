const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'server',
    aliases: ["mc"],
    run: (_, message, args, bot) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Minecraft"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
                    const embed = new Discord.MessageEmbed()
                    const ping = require('minecraft-server-util')

                    ping('karmakingdom.apexmc.co', 25593, (error, response) => {
                        if (error) throw error

                        embed
                            .setTitle("Server Info")
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setColor(message.guild.me.displayColor)
                            .setThumbnail(`https://i.imgur.com/xeHeNVe.png?size=1024`)
                            .setDescription("```Welcome to the Karma Kingdom MC Server!``` \n **JAVA ONLY**")
                            .addField("Server IP", `\`\`\`${response.host}\`\`\``)
                            .addField("Server Version", `\`\`\`${response.version}\`\`\``)
                            .addField("MOTD", `\`\`\`${response.descriptionText}\`\`\``)
                            .addField("Online Players", `\`\`\`${response.onlinePlayers}\`\`\``)
                            .addField("Max Players", `\`\`\`${response.maxPlayers}\`\`\``)
                            .addField("Moderators", `${message.client.guilds.cache.get('605859550343462912').roles.cache.get('711033370108231734').members.map(m => m.user.tag).join('\n')}`)
                            .addField("Admins/OPs", `KingOKarma - <@406211463125008386> \n Melosh - <@355993074117115914>`)
                        if (message.author.id === "406211463125008386") console.log(response)
                        message.channel.send(embed)
                    })
                }
                if (toggle) return message.channel.send("This server has the \"KFC\" module disabled")
            })

    }
}