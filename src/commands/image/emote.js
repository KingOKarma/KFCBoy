const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'emote',
    aliases: ["emotes"],
    run: (_, message, args) => {


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Image"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    


                   let emote = message.client.emojis.cache.find(emoji => emoji.id === "707398696341340191")
                   let emoteID = message.client.emojis.resolveID(emote)


                    message.channel.send(`https://cdn.discordapp.com/emojis/${emoteID}.png`)

                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })
    }
}