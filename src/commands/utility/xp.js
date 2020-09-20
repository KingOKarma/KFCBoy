const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
const Xp = require("../../models/xp.js")

module.exports = {
    name: 'xp',
    aliases: ["experience", "exp"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        function Embed(User) {


            Xp.findOne({
                ServerID: message.guild.id,
                UserID: User.id
            }, (err, xp) => {
                if (err) console.log(err);

                if (xp) {

                    const levelEmbed = new Discord.MessageEmbed();

                    levelEmbed.setTitle(`${User.tag} has ${xp.xp}xp!`)
                        .setDescription(`And ${extraMSG} level \`${xp.level}\` in **${message.guild.name}**`)
                        .addField("Needed XP for next level", xp.level * 200 , true)
                        .addField("Xp left", xp.level * 200 - xp.xp, true)
                        .setColor(message.guild.me.displayColor)
                        .setTimestamp()
                        .setAuthor(User.tag, User.displayAvatarURL());
                    message.channel.send(levelEmbed)
                        .catch(() =>
                            message.reply(`**${User.tag}** ${extraMSG2} level \`${xp.level}\` with \`${xp.xp}\`xp`)
                        )

                } else {


                    const levelEmbed = new Discord.MessageEmbed();

                    levelEmbed.setTitle(`${User.tag} has 0xp!`)
                        .setDescription(`And ${extraMSG} level \`0\` in **${message.guild.name}**`)
                        .addField("Needed XP for next level", xp.level * 200 , true)
                        .addField("Xp left", xp.level * 200 - xp.xp, true)
                        .setColor(message.guild.me.displayColor)
                        .setTimestamp()
                        .setAuthor(User.tag, User.displayAvatarURL());
                    message.channel.send(levelEmbed)
                        .catch(() =>
                            message.reply(`**${User.tag}** ${extraMSG2} level \`0\` with \`0\`xp`)
                        )


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
