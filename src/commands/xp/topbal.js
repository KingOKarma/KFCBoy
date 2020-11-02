const mongoose = require("mongoose");
const Discord = require('discord.js');
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json');
const xp = require("../../models/currency");
const date = new Date()


module.exports = {
    name: 'topbal',
    aliases: ["topmoney"],
    run: (_, message, args) => {

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Currency"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {



                    let guildicon = message.guild.iconURL({ dynamic: true })

                    if (!message.guild.iconURL({ dynamic: true })) {
                        guildicon = "https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png"
                    }




                    xp.find({ ServerID: message.guild.id }, (err, guild) => {
                        const sort = guild.sort(function (a, b) {
                            if (b.Nuggies === a.Nuggies) {
                                return b.Nuggies - a.Nuggies
                            } else {
                                return b.Nuggies - a.Nuggies
                            }
                        })
                        var rank = 1;
                        const amount = Number(args[0]) || 5;
                        const userRanking = sort.findIndex(user => user.UserID === message.author.id)
                        let msgEmbed = new Discord.MessageEmbed()
                        msgEmbed.setTitle(`Top ${amount} balance rankings for ${message.guild.name}`)
                        msgEmbed.setDescription(`Your rank in balance is #${userRanking + 1}`)
                        msgEmbed.setThumbnail(guildicon)
                        msgEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        msgEmbed.setColor(message.guild.me.displayColor)
                        sort.slice(0, amount).forEach(user => {

                            let Username = user.UserName;
                            if (user.UserName === undefined) {
                               Username = `<@${user.UserID}>`
                            };

                            msgEmbed.addField(` #${rank}    ${user.UserName}`, `has ${user.Nuggies} Nuggies\n`)
                            rank++
                        })

                        msgEmbed.setFooter("\n\n " + date.toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' }))
                        message.channel.send(msgEmbed)
                    })
                }
                if (toggle) return message.channel.send("This server has the \"Currency\" module disabled")
            })
    }
}
