const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
const Xp = require("../../models/xp.js")

module.exports = {
    name: 'xp',
    aliases: ["experience", "exp"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {

        function Embed(User) {

            const LogChannel = message.client.channels.cache.get("700438892888719501")

            Xp.findOne({
                ServerID: message.guild.id,
                UserID: User.id
            }, (err, xp) => {
                if (err) console.log(err);

                if (xp) {

                    const levelEmbed = new Discord.MessageEmbed();

                    levelEmbed.setTitle(`${User.tag} has ${xp.xp}xp!`)
                        .setDescription(`And ${extraMSG} level \`${xp.level}\` in **${message.guild.name}**`)
                        .addField("Needed XP for next level", xp.level * 200, true)
                        .addField("Xp left", xp.level * 200 - xp.xp, true)
                        .setColor(message.guild.me.displayColor)
                        .setTimestamp()
                        .setAuthor(User.tag, User.displayAvatarURL());
                    message.channel.send(levelEmbed)
                        .catch(() =>
                            message.reply(`**${User.tag}** ${extraMSG2} level \`${xp.level}\` with \`${xp.xp}\`xp`)
                        )
                        .catch((err) => {
                            console.log(`Error, \"XP cmd\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`)
                            const ErrorEmbed = new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                                .setColor("0xFF0000")
                                .setDescription(`\`\`\`Error, \"XP cmd\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                            LogChannel.send(ErrorEmbed)

                        })

                } else {


                    const levelEmbed = new Discord.MessageEmbed();

                    levelEmbed.setTitle(`${User.tag} has 0xp!`)
                        .setDescription(`And ${extraMSG} level \`0\` in **${message.guild.name}**`)
                        .addField("Needed XP for next level", 0 , true)
                        .addField("Xp left", "Next Message" , true)
                        .setColor(message.guild.me.displayColor)
                        .setTimestamp()
                        .setAuthor(User.tag, User.displayAvatarURL({ dynamic: true }));
                    message.channel.send(levelEmbed)
                        .catch(() =>
                            message.reply(`**${User.tag}** ${extraMSG2} level \`0\` with \`0\`xp`)
                        )
                        .catch((err) => {
                            console.log(`Error, \"XP cmd\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`)
                            const ErrorEmbed = new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                                .setColor("0xFF0000")
                                .setDescription(`\`\`\`Error, \"XP cmd\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                            LogChannel.send(ErrorEmbed)

                        })



                }

            }).catch((err) => {
                message.reply("Database error\n__Reason__\n" + err)
            })


        }



        // let repadd = "On"
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Xp"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {




                    if (args[0] === undefined) {


                        extraMSG = "you"
                        extraMSG2 = "you're"
                        Embed(message.author)


                    } else if (theUser === undefined) {

                        extraMSG = "you"
                        extraMSG2 = "you're"
                        Embed(message.author)


                    } else {//if User is pinged

                        extraMSG = "they"
                        extraMSG2 = "they're"
                        Embed(theUser.user)
                    };






                }
                if (toggle) return message.channel.send("This server has the \"Xp\" module disabled")

            })







    }
}
