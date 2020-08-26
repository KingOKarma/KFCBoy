const Discord = require("discord.js")
const mongoose = require("mongoose");
const Rep = require("../../models/rep.js");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 




const usedCommandRecentlly = new Set();




module.exports = {
    name: `plusrep`,
    aliases: ["rep", "addrep"],
    run: async (_, message, args, bot, prefix) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Interactable"
        },
            (err, toggle) => {
                if (err) console.log(err);
                if (!toggle) {

                let targetUser = message.guild.member(message.mentions.users.first());
                if (!targetUser) {
                    message.channel.send("Is that a member? you sure? trying mentioning them");
                    return;
                }



                if (usedCommandRecentlly.has(message.author.id)) {
                    message.reply("You can only rep every 12 hours!")
                } else {



                    let repadd = Math.ceil(+1)
                    console.log(repadd + " Rep")
                    Rep.findOne({
                        UserID: targetUser.id,
                    },
                        (err, rep) => {

                            if (err) console.log(err);
                            if (!rep) {
                                const newRep = new Rep({
                                    _id: mongoose.Types.ObjectId(),
                                    UserID: targetUser.id,
                                    rep: repadd
                                })

                                newRep.save().catch(err => console.log(err));

                            } if (rep) {
                                rep.rep = rep.rep + repadd;
                                rep.save().catch(err => console.log(err));
                            }

                        })

                    Rep.findOne({

                        UserID: targetUser.id
                    },
                        (err, rep) => {
                            if (err) console.log(err);
                            let repEmbed = new Discord.MessageEmbed()
                                .setAuthor(targetUser.user.tag, targetUser.user.displayAvatarURL({ dynamic: true }))
                                .setColor(message.guild.me.displayColor)
                                .setThumbnail(targetUser.user.displayAvatarURL({ dynamic: true }))
                                .setTitle(`${targetUser.displayName} Reputation:`)

                            if (!rep) {
                                repEmbed.addField("Reputation", "1", true);
                                return message.channel.send(repEmbed);

                            } else {
                                repEmbed.addField("Reputation", rep.rep + repadd, true)
                                return message.channel.send(repEmbed);

                            }

                        })



                    if (message.author.id != "406211463125008386") {
                        usedCommandRecentlly.add(message.author.id);

                        setTimeout(() => {
                            usedCommandRecentlly.delete(message.author.id)
                        }, 43200000);
                    }
                }

            }
        if (toggle) return message.channel.send("This server has the \"Interactable\" module disabled")
        })

    }
}