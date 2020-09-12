const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 

module.exports = {
    name: 'cool',
    run: (_, message) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Fun"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    embed = new Discord.MessageEmbed()

                        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                        .setDescription(`:sunglasses:`)
                        .addField("Click the video to learn how to be cool!", "https://youtu.be/dQw4w9WgXcQ")
                    message.channel.send(embed);
                }
                if (toggle) return message.channel.send("This server has the \"Fun\" module disabled")
            })


    }
}