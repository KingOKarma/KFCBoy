const Discord = require("discord.js");
const Toggle = require("../../models/toggle.js");
const Log = require("../../models/log.js");

module.exports = {
    name: 'modlogs',
    aliases: ["modlog"],
    run: (_, message, args, prefix, MongoToggle) => {



        isuser = false

        const UserArgs = message.content.slice(prefix.length).trim().split(/ +/g);



        if (isuser = false) {
            return console.log("not a thing")
        } if (isuser = true) {
             theUser = message.mentions.users.first();
            // If we have a user mentioned
            if (theUser) {
                // Now we get the member from the user
                // var theUser = message.client(user);

                // If the member is in the guild
                if (!theUser) {
                    console.log("Mention Check")
                    message.reply("That user isn't in this guild!");
                }
            } else {
                console.log(UserArgs.join(' '))
                if (UserArgs[1] === undefined) {

                } else if (UserArgs[1].match(/\d{18}/)) {
                    console.log("ID Check")
                    var theUser = message.client.users.cache.find(member => member.id === UserArgs[1])
                }


            }
        }


        if (!message.member.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send("You need the permission __**\"Kick Members\"**__ to use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send("I need the permission __**\"Kick Members\"**__ to use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        if (UserArgs[1] === undefined || null) return message.reply("Please Dont leave the first argument blank!")
        if (theUser === undefined) return message.reply("Please mention a user!")




        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Staff"
        },
            (err, toggle) => {
                if (err) console.log(err);
                if (!toggle) {


                    Log.findOne({
                        ServerID: message.guild.id,
                        TheUser: theUser.id
                    },
                        (err, log) => {


                            if (err) console.log(err);
                            if (!log) {

                                message.reply("Hey you that person doesnt have any logs! wowie what a super star! <:KaineCute:735541745433182288>")
                            }

                            else if (log) {

                                const ModLogEmbed = new Discord.MessageEmbed()

                                    .setThumbnail(`${theUser.displayAvatarURL({ dynamic: true })}?size=1024`)
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                    .setColor(message.guild.me.displayColor)
                                    .setDescription(`Logs for **${theUser.tag}**`)
                                for (var i = 0; i < log.Reason.length; i++) {
                                    ModLogEmbed.addFields(
                                        { name: `**Case ${log.CaseNumber[i + 1 - 1]}**`, value: `\n**Mod:** ${log.UserID[i+1-1]}\n**User:** ${theUser.tag}\n**Reason:** ${log.Reason[i+1-1]}, ${log.Timestamp[i+1-1]}\n**Type:** ${log.Type[i+1-1]}`, inline: true },

                    
                                    )
                                }





                                message.channel.send(ModLogEmbed)

                            }
                        }


                    ).catch(err => {
                        message.reply(`Failed to load to database.\n__Reason__\n**${err}**`)
                    })




                }
                if (toggle) return message.channel.send("This server has the \"Interactable\" module disabled")
            })

    }
}