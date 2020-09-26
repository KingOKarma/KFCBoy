const Discord = require("discord.js");
const globalXp = require("../../models/globalXp")
const Toggle = require("../../models/toggle.js");
const date = new Date();

module.exports = {
    name: "global-leaderboard",
    aliases: ["gtop", "glb"],
    run: (_, message, args) => {


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Xp"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {


                    let guildicon = message.guild.iconURL({ dynamic: true })


                    if (!message.guild.iconURL({ dynamic: true })) {
                        guildicon = "https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png"
                    }


                    globalXp.find({}, (err, users) => {
                        const sort = users.sort(function (a, b) {
                            if (b.level === a.level) {
                                return b.xp - a.xp
                            } else {
                                return b.level - a.level
                            }
                        })
                        var rank = 1;
                        const amount = Number(args[0]) || 5;
                        const userRanking = sort.findIndex(user => user.UserID === message.author.id)
                        let msgEmbed = new Discord.MessageEmbed()
                        msgEmbed.setTitle(`Top ${amount} global level rankings`)
                        msgEmbed.setDescription(`Your rank is #${userRanking + 1}`)
                        msgEmbed.setThumbnail(guildicon)
                        msgEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        msgEmbed.setColor(message.guild.me.displayColor)
                        sort.slice(0, amount).forEach(user => {
                            msgEmbed.addField(` #${rank}    ${user.UserName}`, `is level ${user.level} and has ${user.xp} xp\n`)
                            rank++
                        })
                        msgEmbed.setFooter("\n\n " + date.toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' }))
                        message.channel.send(msgEmbed)
                    })
                }
                if (toggle) return message.channel.send("This server has the \"Xp\" module disabled")
            })
    }
}