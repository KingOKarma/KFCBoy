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
                    console.log(args[0])
                    if (args[0] === undefined) {
                        console.log("thats nothing dummy")
                        message.channel.send("Please send an emote of a server that im in!")
                        return
                    }else if (!args[0].match(/\:(.*?)\>/)){
                        console.log("that aint no id")
                        message.channel.send("Please send an emote of a server that im in!")
                        return
                    }

                    
                    var first = args[0].slice(3).match(/\:.*?\>/)
                    var theMatch = first[0].slice(1, -1)
                    console.log(theMatch)

                    if (args[0].match(/<a/)) {
                        console.log("animated!")
                        var emote = message.client.emojis.cache.find(emoji => emoji.id === `${theMatch}`)
                        var emoteID = message.client.emojis.resolveID(emote)
                        var ending = ".gif"
                    } else{
                        console.log("not animated!")
                        var emote = message.client.emojis.cache.find(emoji => emoji.id === `${theMatch}`)
                        var emoteID = message.client.emojis.resolveID(emote)
                        var ending = ".png"
                    }

                    if (emote === undefined) {
                        message.channel.send("I can only send emotes from servers that I'm in!")
                        return
                    }
                    console.log(args.join(' '))
                    message.channel.send(`https://cdn.discordapp.com/emojis/${emoteID}${ending}?size4096`)

                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })
    }
}