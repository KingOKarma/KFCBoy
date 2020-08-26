const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'kiss',

    run: (_, message, args, bot) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Interactable"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
                    const prefix = 'k!';

                    const embed = new Discord.MessageEmbed();

                    msg = message.content.toLowerCase();


                    const mention = message.mentions.users.first();



                    let kissgif = ['https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif',
                        'https://media.giphy.com/media/gTLfgIRwAiWOc/giphy.gif',
                        'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
                        'https://media.giphy.com/media/13uxqoROqopjy/giphy.gif',
                        'https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif',
                        'https://media.giphy.com/media/MXAPA2JH9GS4g/giphy.gif',
                        'https://media.giphy.com/media/52SvdzXWPjdOo/giphy.gif',
                        'https://media.giphy.com/media/6d1HE6vVDfUze/giphy.gif',
                        'https://media.giphy.com/media/QweWddrIQxlfi/giphy.gif',
                        'https://media.giphy.com/media/IRJ6rKh6lQW7S/giphy.gif',
                        'https://media.giphy.com/media/NKmXVFgwd8HKw/giphy.gif',
                        'https://media.giphy.com/media/qvwnbNRNoa04U/giphy.gif',
                        'https://media.giphy.com/media/ufm7PH1ySR8f6/giphy.gif',
                        'https://media.giphy.com/media/vTfFCC3rSfKco/giphy.gif'];
                    let kissgifsend = kissgif[Math.floor(Math.random() * kissgif.length)];




                    switch (args.join(" ")) {


                        //author id
                        case message.author.id: {
                            embed
                                .addField("**Kissy**", `**Aww ${message.author} wants a kiss , Here have a kiss 💋**`)
                                .setImage(kissgifsend)
                                .setColor(message.guild.me.displayColor)
                            message.channel.send(embed);
                            break;
                        }

                        //mentioning author
                        case `<@${message.author.id}>`: {
                            embed
                                .addField("**Kissy**", `**Aww ${message.author} wants to kiss themself, Here have a kiss💋**`)
                                .setImage(kissgifsend)
                                .setColor(message.guild.me.displayColor)
                            message.channel.send(embed);
                            break;
                        }

                        //mentioning author who has nickname
                        case `<@!${message.author.id}>`: {
                            embed
                                .addField("**Kissy**", `**Aww ${message.author} wants to kiss themself, Here have a kiss💋**`)
                                .setImage(kissgifsend)
                                .setColor(message.guild.me.displayColor)
                            message.channel.send(embed);
                            break;
                        }

                        //id of bot
                        case "614110037291565056": {
                            embed
                                .addField("**Kissy**", `**You'd kiss me** 😳`)
                                .setImage(kissgifsend)
                                .setColor(message.guild.me.displayColor)
                            message.channel.send(embed);
                            break;
                        }

                        //mentioning bot
                        case `<@614110037291565056>`: {
                            embed
                                .addField("**Kissy**", `**You'd kiss me** 😳`)
                                .setImage(kissgifsend)
                                .setColor(message.guild.me.displayColor)
                            message.channel.send(embed);
                            break;
                        }

                        //mentioning bot with nickname
                        case `<@!614110037291565056>`: {
                            embed
                                .addField("**Kissy**", `**You'd kiss me** 😳`)
                                .setImage(kissgifsend)
                                .setColor(message.guild.me.displayColor)
                            message.channel.send(embed);
                            break;
                        }

                        case args.join(" "): {
                            embed
                                .addField("**Kissy**", `**${message.author} has kissed ${args.join(' ')}💋**`)
                                .setImage(kissgifsend)
                                .setColor(message.guild.me.displayColor)
                            message.channel.send(embed);
                            break;


                        }

                    }

                }
                if (toggle) return message.channel.send("This server has the \"Interactable\" module disabled")
            })


    }
}

