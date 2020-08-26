const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'servers',
    aliases: ["guilds"],
    run: (_, message, args, bot) => {
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Info"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    message.reply(`\n> Im in **${message.client.guilds.cache.size}** servers`)
                }
                if (toggle) return message.channel.send("This server has the \"Info\" module disabled")
            })
    }
}