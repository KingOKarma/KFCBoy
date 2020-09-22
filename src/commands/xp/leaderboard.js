const mongoose = require("mongoose");
const Discord = require('discord.js');
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
const xp = require("../../models/xp")
const date = new Date()


module.exports = {
    name: 'leaderboard',
    aliases: ["lb", "top"],
    run: (_, message, args) => {
        
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Xp"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
                    xp.find({ServerID: message.guild.id}, (err, guild) => {
                        const sort = guild.sort(function(a, b){
                            if(b.level === a.level) {
                               return b.xp-a.xp
                            } else {
                                return b.level-a.level
                            }
                        })
                        var rank = 1;
                        const amount = Number(args[0]) || 5;
                        const userRanking = sort.findIndex(user => user.UserID === message.author.id)
                        var embed = `\`\`\`md\n < Top ${amount} level rankings for ${message.guild.name} >\n`;
                        embed += ` >    Your rank is #${userRanking + 1}\n`
                        sort.slice(0, amount)
                        sort.forEach(user => {
                            embed += ` #${rank}    ${user.UserName}\n`
                            embed += `           is level ${user.level} and has ${user.xp} xp\n`
                            rank++
                        })
                        embed += "\n\n " + date.toLocaleString("en-US", {month: '2-digit', day: '2-digit', year:'numeric', hour12:false, hour: '2-digit', minute:'2-digit'})+"```";
                        message.channel.send(embed)
                    }) 
                }
                if (toggle) return message.channel.send("This server has the \"Xp\" module disabled")
            })
    }
}
