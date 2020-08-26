const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const { endianness } = require("os");
const { exit } = require("process");
const config = require('../../config.json'); 



module.exports = {
    name: 'info',
    aliases: ["botinfo", "bot"],
    run: (_, message, args, bot) => {
        if(!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")



        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });


        // let repadd = "On"
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Info"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    // switch (message.guild.me.hasPermission("EMBED_LINKS")) {

                    //     case false: {
                    //         message.channel.send("I need the permission __**\"Embed links\"**__ to use this command")
                    //             .catch((err) => {
                    //                 console.log(err)
                    //             })
                    //         break;
                    //     }


                        // case true: {
                            const embed = new Discord.MessageEmbed()
                                .setTitle('User/Bot Information')
                                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                .setColor(message.guild.me.displayColor)
                                .setImage(`${message.guild.iconURL({ dynamic: true })}?size=1024`)
                                .addField('Current Server -', message.guild.name, true)
                                .addField(`Your ID -`, message.author.id, true)
                                .addField('Serving -', `${message.client.users.cache.size} users`, true)
                                .addField('Looking at -', `${message.client.channels.cache.size} channels`, true)
                                .addField('Working inside -', `${message.client.guilds.cache.size} servers`, true)
                                .addField("Server Icon", "↓↓↓↓↓↓↓↓")
                            message.channel.send(embed);
                            // break;
                            // .catch((err) => {
                            //     console.log(err)
                            // })
                        // }

                    // }





                }
                if (toggle) return message.channel.send("This server has the \"Info\" module disabled")

            })







    }
}
