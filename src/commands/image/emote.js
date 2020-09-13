const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'emote',
    aliases: ["emotes", "emoji"],
    run: (_, message, args) => {


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Image"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    if (args[0] === undefined) {
                        message.channel.send("Please send an emote of a server that im in!")
                        return
                    }else if (args[0] != args[0].match(/<a:.+?:\d+>|<:.+?:\d+>/)){
                        message.channel.send("Please send an emote of a server that im in!")
                        return
                    }


                    if (args[0].match(/<a/)) {
                        console.log("animated!")
                        var emote = message.client.emojis.cache.find(emoji => emoji.id === `${args[0].match(/[0-9]+/)}`)
                        var emoteID = message.client.emojis.resolveID(emote)
                        var ending = ".gif"
                    } else{
                        console.log("not animated!")
                        var emote = message.client.emojis.cache.find(emoji => emoji.id === `${args[0].match(/[0-9]+/)}`)
                        var emoteID = message.client.emojis.resolveID(emote)
                        var ending = ".png"
                    }

                    if (emote === undefined) {
                        message.channel.send("I can only send emotes from servers that I'm in!")
                        return
                    }
                    console.log(args.join(' '))
                    message.channel.send(`https://cdn.discordapp.com/emojis/${emoteID}${ending}`)

                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })
    }
}