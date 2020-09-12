const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'membercount',
    aliases: ["members", "countmembers"],
    run: (_, message, args) => {
        if(!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Info"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {


        var realuser = message.guild.members.cache.filter(member => !member.user.bot).size
        var botuser = message.guild.members.cache.filter(member => member.user.bot).size

        let embedmember = new Discord.MessageEmbed()
        embedmember
            .addField(`${message.guild.name}`, `This server has **${message.guild.memberCount}** members`)
        if (args.join(' ') === null || "humans" || "human") {
            embedmember.addField('\u200b', `Human Members - **${realuser}**`)
        }
        if (args.join(' ') === null || "bots" || "bot") {
        embedmember.addField('\u200b', `Bot Memembers - **${botuser}**`) }
        embedmember.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        embedmember.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        embedmember.setImage(`${message.guild.iconURL({ dynamic: true })}?size=1024`)
        embedmember.setColor(message.guild.me.displayColor)
        message.channel.send(embedmember);
        }
        if (toggle) return message.channel.send("This server has the \"Info\" module disabled")
    })
    }
}