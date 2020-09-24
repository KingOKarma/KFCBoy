const Discord = require("discord.js");
const currency = require("../../models/currency");
const Toggle = require("../../models/toggle");


module.exports = {
    name: "nuggies",
    aliases: ["bal", "money"],
    run : (_, message, args) => {

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "currency" 
        },
            (err, toggle) => {
                if(err) console.log(err);
                if(!toggle) {
                    currency.findOne({UserID: message.author.id, ServerID: message.guild.id}, (err, user) => {
                        if(!user) {
                            message.reply("it seems like you havent started working yet. use \"k!work list\" to see available jobs")
                        } else {
                            if(!args) {
                                const thumbnail = message.guild.iconURL || "https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png"
                                var embed = new Discord.MessageEmbed()
                                .setThumbnail(thumbnail)
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                                .addField(message.author.tag, `has ${user.Nuggies} <:chickennuggie:706268265424355399>`)
                                .setTimestamp();
                                message.send(embed);
                            }
                        }
                    })
                } else {
                    message.channel.send("This server has the \"Currency\" module disabled")
                }
            })

    }
}