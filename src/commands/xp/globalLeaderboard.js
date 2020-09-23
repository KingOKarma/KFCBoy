const Discord = require("discord.js");
const XP = require("../../models/xp")
const date = new Date();

module.exports = {
    name: "global-leaderboard",
    aliases: ["gtop", "glb"],
    run: (_, message, args) => {
        XP.find({}, (err, users) => {
            console.log(users)
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
            msgEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            msgEmbed.setColor(message.guild.me.displayColor)
            sort.slice(0, amount).forEach(user => {
                msgEmbed.addField(` #${rank}    ${user.UserName}`, `is level ${user.level} and has ${user.xp} xp\n and is in the server ${user.ServerName}\n`)
                rank++
            })
            msgEmbed.setFooter("\n\n " + date.toLocaleString("en-US", { month: '2-digit', day: '2-digit', year: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' }))
            message.channel.send(msgEmbed)
        })
    }
}