const Discord = require("discord.js");
const Toggle = require("../../models/toggle");
const currency = require("../../models/currency");
const work = require("../../models/work");
const stopWork = new Set();

module.exports = {
    name: "work",
    run: (_, message, args) => {
        

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "currency"
        },
            (err, toggle) => {
                if(err) console.log(err);
                if(!toggle) {
                    currency.findOne({
                        ServerID: message.guild.id,
                        UserID: message.author.id,
                    }, 
                        (err, user) => {
                            if(!args[0]) {
                                if(!user) {
                                    const thumbnail = message.guild.iconURL || "https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png"
                                    const embed = new Discord.MessageEmbed()
                                      .setAuthor(message.author.tag, message.author.displayAvatarURL)
                                      .setThumbnail(thumbnail)
                                      .addField("jobs list", "Chicken Nuggie fryer\nChicken nuggie inspector\nChicken nuggie taste tester\n", true)
                                      .addField("job nickname", "Fryer\nInspector\ntaste-tester\n\n", true)
                                      .setFooter("\nto \"apply\" for a job use k!work [Work nickname here]")
                                    message.channel.send(embed)
                                } else {
                                    if (stopWork.has(message.author.id)) {
                                        message.reply("sorry man but i dont want an overflow of nuggies")
                                    } else {
                                        const earnings = Math.floor(Math.random() * (300 - 100 + 1) ) + 100;
                                        if(user.premium) earnings = earnings * 1.5;
                                        user.Nuggies = user.Nuggies + earnings;
                                        user.save().catch(err => console.log(err))
                                        stopWork.add(message.author.id)
                                        message.channel.send(`you earned ${earnings} <:chickennuggie:706268265424355399>`)
                                    }
                                }
                            } else {
                                work.findOne({
                                    UserID: message.author.id,
                                     ServerID: message.guild.id
                                    },
                                        (err, worker) => {
                                            if(err) console.log(err);
                                            if(!worker) {
                                                switch (args[0].toLowerCase()) {
                                                    case "fryer":
                                                            const newWorker = new work({
                                                                ServerID: message.guild.id,
                                                                UserID: message.author.id,
                                                                Work: "Fryer"
                                                            })
                                                            const newUser = new currency({
                                                                ServerID: message.guild.id,
                                                                UserID: message.author.id
                                                            })
                                                            newWorker.save().catch(err => console.log(err))
                                                            newUser.save().catch(err => console.log(err))
                                                            message.channel.send("you are now working as \"Chicken nuggie fryer\"")
                                                        break;
                                                        case "inspector":
                                                            const newWorker2 = new work({
                                                                ServerID: message.guild.id,
                                                                UserID: message.author.id,
                                                                Work: "Inspector"
                                                            })
                                                            const newUser2 = new currency({
                                                                ServerID: message.guild.id,
                                                                UserID: message.author.id
                                                            }) 
                                                            newWorker2.save().catch(err => console.log(err))
                                                            newUser2.save().catch(err => console.log(err))
                                                            message.chanel.send("you are now working as \"Chicken nuggie Inspector\"")
                                                        break;
                                                        case "taste-tester":
                                                            const newWorker3 = new work({
                                                                ServerID: message.guild.id,
                                                                UserID: message.author.id,
                                                                Work: "Taste-tester"
                                                            })
                                                            const newUser3 = new currency({
                                                                ServerID: message.guild.id,
                                                                UserID: message.author.id
                                                            })
                                                            newWorker3.save().catch(err => console.log(err))
                                                            newUser3.save().catch(err => console.log(err))
                                                            message.chanel.send("you are now working as \"Chiken nuggie taste tester\"")
                                                        break;
                                                
                                                    default:
                                                            message.channel.send("there is no job with that name")
                                                        break;
                                                }
                                            } else {
                                                message.reply("you already have a job dont stress yourself") 
                                            }
                                        })
                            }
                        })
                } else {
                    message.channel.send("This server has the \"Currency\" module disabled")
                }
            })
    }
}