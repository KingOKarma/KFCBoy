const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'kiss',

    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Interactable"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    const embed = new Discord.MessageEmbed();

                    msg = message.content.toLowerCase();





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








                    if (theUser) {
                        var targetUser = theUser.user

                    }


                    if (args[0] === undefined) {
                        embed
                            .addField("**Kissy**", `**Aww ${message.author} wants a kiss , Here have a kiss 💋**`)
                            .setImage(kissgifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    }
                    else if (targetUser === undefined) {
                        embed
                            .addField("**Kissy**", `**Aww ${message.author} wants a kiss , Here have a kiss 💋**`)
                            .setImage(kissgifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    } else if (theUser.id === message.author.id) {
                        embed
                            .addField("**Kissy**", `**Aww ${message.author} wants a kiss , Here have a kiss 💋**`)
                            .setImage(kissgifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return

                    } else if (theUser.id === "614110037291565056") {
                        embed
                            .addField("**Kissy**", `**You'd kiss me** 😳`)
                            .setImage(kissgifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return

                    } else {
                        embed
                            .addField("**Kissy**", `**${message.author} has kissed ${targetUser.tag}💋**`)
                            .setImage(kissgifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    }




                }
                if (toggle) return message.channel.send("This server has the \"Interactable\" module disabled")
            })


    }
}

