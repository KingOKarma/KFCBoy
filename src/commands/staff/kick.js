const Discord = require("discord.js");
const Toggle = require("../../models/toggle.js");

module.exports = {
    name: 'kick',
    aliases: ["k"],
    run: (_,  message, args, prefix, MongoToggle, theUser) => {
        const UserArgs = message.content.slice(prefix.length).trim().split(/ +/g);

        if (!message.member.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send("You need the permission __**\"Kick Members\"**__ to use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send("I need the permission __**\"Kick Members\"**__ to use this command")
        if (UserArgs[1] === undefined || null) return message.reply("Please Dont leave the first argument blank!")
        if (theUser === undefined) return message.reply("Please mention a user!")




        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Staff"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
                    isuser = true
                    // functions.UserMention(message, args)


                    // if (theUser.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send("I cannot kick members who have kick permissions!")
                    theUser.kick(`${theUser} was kicked! for ${UserArgs.join(" ")}`)
                    .then(() => {
                        message.reply(`**${theUser.user.username}** Has been kicked! for ${UserArgs.join(" ")}`)
                    })
                    .catch(err => {
                        message.reply(`I was unable to kick that member.\n__Reason__\n**${err}**`)
                    })

                }
                if (toggle) return message.channel.send("This server has the \"Staff\" module disabled")
            })

    }
}