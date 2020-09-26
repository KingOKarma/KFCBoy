const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json');

module.exports = {
    name: 'kids',
    aliases: ["kid", "children"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Fun"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
                    const embed = new Discord.MessageEmbed()

                    let kidssend = Math.floor(Math.random() * (10000 - 0 + 1)) + 0;

                    // let kidssend = kidsnumber[Math.floor(Math.random() * kidsnumber.length)];

                    let kids = ["https://thumbs.gfycat.com/CavernousVainIvorybilledwoodpecker-size_restricted.gif",
                        "https://media.giphy.com/media/TfpskWcTTKdce4Ff81/giphy.gif",
                        "https://media0.giphy.com/media/8MFkW6mDff37G/giphy.gif",
                        "https://cdn130.picsart.com/254292487011202.gif",
                        "https://media0.giphy.com/media/VHwgHhJLuWt0gjjUzf/giphy.gif",
                        "https://media0.giphy.com/media/5MIHIZlSEWRuU/giphy.gif",
                        "https://38.media.tumblr.com/acd4f516dbb8480826dd76ada2863da0/tumblr_nmyji2aSWU1qdofhmo1_500.gif",
                        "https://i.gifer.com/9bOr.gif",
                        "https://thumbs.gfycat.com/AbleThreadbareKingbird-small.gif",
                        "https://media2.giphy.com/media/R1c7rUJA7uMoM/giphy.gif?cid=ecf05e4732dada860c063b54e69a9e163d76c23a0b9c7ab7&rid=giphy.gif"]
                    let send = kids[Math.floor(Math.random() * kids.length)];


                    if (theUser) {
                        var targetUser = theUser.user

                    }


                    if (args[0] === undefined) {
                        embed
                            .setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .addField("Number of kids", `In the future **you** will have will have \`${kidssend}\` kids`)
                            .setImage(send)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    }
                    else if (targetUser === undefined) {
                        embed
                            .setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .addField("Number of kids", `In the future **you** will have will have \`${kidssend}\` kids`)
                            .setImage(send)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    } else if (theUser.id === message.author.id) {
                        embed
                            .setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .addField("Number of kids", `In the future **you** will have will have \`${kidssend}\` kids`)
                            .setImage(send)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return

                    } else if (theUser.id === "614110037291565056") {
                        embed
                            .setTitle(targetUser.tag, targetUser.displayAvatarURL({ dynamic: true }))
                            .addField("Number of kids", `Number of kids", "well... '(*>﹏<*)' in the future i'll have... \`${kidssend}\` kids!`)
                            .setImage(send)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return

                    } else {
                        embed
                            .setTitle(targetUser.tag, targetUser.displayAvatarURL({ dynamic: true }))
                            .addField("Number of kids", `In The future **${targetUser.tag}** will have \`${kidssend}\` kids`)
                            .setImage(send)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    }



                }
                if (toggle) return message.channel.send("This server has the \"Fun\" module disabled")
            })






    }
}