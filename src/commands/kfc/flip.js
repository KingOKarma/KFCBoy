const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'flip',
    aliases: ["headsortails", "hot"],
    run: (_, message) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "KFC"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {


                    const embed = new Discord.MessageEmbed()


                    embed.setDescription("**__Please type Heads or Tails!__** <:KaineCute:735541745433182288> \n note: make sure it is only \"Heads\" or \"Tails\" anything else will fail")
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                        // .setImage("https://i.imgur.com/QcUu9EI.gif")
                        .setColor(message.member.guild.me.displayColor)

                    message.channel.send(embed)

                    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000000 });
                    if (message.author.bot) return;
                    flip = ["Heads", "Tails"]
                    var FlipAnswer = flip[Math.floor(Math.random() * flip.length)];

                    collector.once("collect", message => {
                        if (message.content.toLowerCase() == "heads" && FlipAnswer == "Heads") {

                            const embedwin = new Discord.MessageEmbed()

                            embedwin.setDescription(`**You win!! Great Job <:KainePog:735541671349059685>**`)
                                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                .setImage("https://i.imgur.com/KxwLOtw.gif")
                                // .setImage("https://i.imgur.com/0WE4m9h.png")
                                .setColor(message.member.guild.me.displayColor)

                            message.channel.send(embedwin)
                            console.log(`The number is ${FlipAnswer}`)

                            //     else {
                            //     message.channel.send(`Better luck next time! \nThe real number is ${BucketNumber}`)
                            //     console.log(`The number is ${BucketNumber}`)

                            // }
                            return
                        } else if (message.content.toLowerCase() == "tails" && FlipAnswer == "Tails") {

                            const embedwin = new Discord.MessageEmbed()

                            embedwin.setDescription(`**You win!! Great Job <:KainePog:735541671349059685>**`)
                                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                .setImage("https://imgur.com/a/p3ZUeLT")
                                // .setImage("https://i.imgur.com/0WE4m9h.png")
                                .setColor(message.member.guild.me.displayColor)

                            message.channel.send(embedwin)
                            console.log(`The number is ${FlipAnswer}`)
                            //             else {
                            //     message.channel.send(`Better luck next time! \nThe real number is ${BucketNumber}`)
                            //     console.log(`The number is ${BucketNumber}`)

                            // }
                            return

                        } else {
                            const embedlose = new Discord.MessageEmbed()

                            embedlose.setDescription(`**I'm afraid that's a fail.. <:KaineShrug:735541548770525215> **\n__The answer is **${FlipAnswer}**__`)
                                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                .setImage("https://i.imgur.com/zpL7x9T.gif")
                                // .setImage("https://i.imgur.com/zFyxGkw.png")
                                .setColor(message.member.guild.me.displayColor)

                            message.channel.send(embedlose)
                            // console.log(`The number is ${BucketNumber}`)


                        }


                    })
                }
                if (toggle) return message.channel.send("This server has the \"KFC\" module disabled")
            })
    }
}