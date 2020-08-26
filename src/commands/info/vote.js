const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'vote',
    aliases: ["discord", "upvote"],
    run: (_, message, args, bot) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Info"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
                    const embed = new Discord.MessageEmbed()
                        .setAuthor("Creator King Of Karma#0069", "https://karmakingdom.weebly.com/uploads/1/3/1/7/131732357/pfp.png")
                        .addField("Vote!", "You can upvote KFC Bucket Boi at <https://top.gg/bot/614110037291565056/vote> \n Remember to upvote daily!")
                        .setImage("https://top.gg/api/widget/614110037291565056.png?v=" + (Date.now() >> 0).toString(36))
                        .setThumbnail(message.client.user.displayAvatarURL())
                        .setColor(message.guild.me.displayColor)


                    message.channel.send(embed)

                }
                if (toggle) return message.channel.send("This server has the \"Info\" module disabled")

            })
    }
}