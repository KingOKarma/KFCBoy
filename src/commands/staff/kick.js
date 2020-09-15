const Discord = require("discord.js");
const { theUser } = require("../../functions.js");
const functions = require("../../functions.js");
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'kick',
    aliases: ["k"],
    run: (_, message, args) => {
        if (!message.member.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send("You need the permission __**\"Kick Members\"**__ to use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("KICK_MEMBERS")) return message.channel.send("I need the permission __**\"Kick Members\"**__ to use this command")
        if (args[0] === undefined) return message.reply("Please Dont leave the first argument blank!")




        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Staff"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
                    functions.UserMention(message, args, "kicked")

                    }
                if (toggle) return message.channel.send("This server has the \"Staff\" module disabled")
            })

    }
}