const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json');
const message = require("../../events/message.js");
module.exports = {
    name: 'image',
    aliases: ["pic", "picture", "img"],
    run: async (_, message, args, prefix, MongoToggle) => {

        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Image"
        },
            async (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    const fetch = require('node-fetch');
                    const config = require("../../config.json")

                    message.channel.startTyping();


                    const res = await fetch(
                        `https://api.imgur.com/3/gallery/search/viral/all/1?q=${args.join(" ")}`,
                        {
                            headers: {
                                'Client-ID': config.ImgurClientID,
                                'Authorization': `Client-ID ${config.ImgurClientID}`,
                                // 'Accept': 'application/vnd.twitchtv.v5+json'
                            }
                        }
                    );
                    if (res.status !== 200) {
                        throw new Error(`Received a ${res.status} status code`);
                    }

                    const body = await res.json();
                    const Ranimg = body.data[Math.floor(Math.random() * body.data.length)];

                    console.log(Ranimg)


                    if (Ranimg == undefined) {

                    message.reply("Sorry but I couldn't find anything?")
                    message.channel.stopTyping();
                        return

                    }

                    let link = Ranimg.images[0].link


                    if (Ranimg.images[0].link === undefined) {
                        console.log("its not an images array")

                        link = Ranimg.link
                    }
                    console.log(link)

                    const embed = new Discord.MessageEmbed()
                    embed
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTitle(`**${args.join(" ")}**`)
                        .setImage(`${link}`)
                        .setFooter(`Image found from ${link}`)
                        .setColor(message.guild.me.displayColor)
                    return message.channel.send(embed)
                    .then(() => message.channel.stopTyping())
                    .catch((err) => {
                        console.log(err)
                        message.channel.stopTyping()
                    })
                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })
    }
}


