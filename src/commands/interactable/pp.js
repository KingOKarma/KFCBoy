const Discord = require("discord.js");
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'pp',
    aliases: ["size"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"EMBED_LINKS\"**__ to use this command")


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Interactable"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    var ranNum = Math.floor(Math.random() * (50 - -10 + 1)) + -10;


                    if (args[0] === undefined) {
                        message.channel.send("Oh your pp size is now: " + ranNum + "″ <a:kaineflushedeyes:708477282079211570>")
                    }else {
                        message.channel.send("Oh **" + theUser.user.tag + "'s** size is now: " + ranNum + "″ <a:kaineflushedeyes:708477282079211570>")
                    }








                }
                if (toggle) return message.channel.send("This server has the \"Interactable\" module disabled")
            })

    }
}