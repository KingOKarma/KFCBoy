const Discord = require("discord.js");
const Toggle = require("../../models/toggle.js");
const Log = require("../../models/log.js");

module.exports = {
    name: 'warn',
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        const UserArgs = message.content.slice(prefix.length).trim().split(/ +/g);

        if (!message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES")) return message.channel.send("You need the permission __**\"Manage Messages\"**__ to use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("MANAGE_MESSAGES")) return message.channel.send("I need the permission __**\"Manage Messages\"**__ to use this command")
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

                    var reason = args.join(" ").slice(23)
                    console.log(args[2])

                    console.log(args[0] + " This is args 1")
                    if (args[0].match(/^(\d{18})$/)) {
                        console.log("ID was found")
                        var reason = args.join(" ").slice(19)
                    }

                    if (args[1] === undefined) {
                        var reason = "No reason set"
                    }



                    const d = new Date(message.createdAt);
                    date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
                    message.reply(`**${theUser.user.tag}** Has been warned! for ${reason}`)
                    .then(() => {
                            Log.findOne({
                                ServerID: message.guild.id,
                                TheUser: theUser.user.id
                            },
                                (err, log) => {


                                    if (err) console.log(err);
                                    if (log) {
                                        console.log("updated")



                                        log.Reason.push(reason);
                                        log.UserID.push(message.author.tag)
                                        log.Type.push("Warn")
                                        log.Timestamp.push(date)
                                        const casenumber = log.CaseNumber.length + 1
                                        log.CaseNumber.push(casenumber - 1)

                                        log.save().catch(err => console.log(err));

                                        return
                                    } else {
                                        message.channel.send("First time this user has been warned from this server! <:Kainepog:709455703567499326>")
                                        const newLog = new Log({
                                            ServerID: message.guild.id,
                                            UserID: message.author.tag,
                                            TheUser: theUser.user.id,
                                            Type: "Warn",
                                            Reason: reason,
                                            Timestamp: date,
                                            CaseNumber: 0
                                        })
                                        newLog.save().catch(err => console.log(err));
                                        return
                                    }

                                }

                            ).catch(err => {
                                message.reply(`Failed to save to database.\n__Reason__\n**${err}**`)
                            })
                        })
                        .catch(err => {
                            message.reply(`I was unable to warn that member.\n__Reason__\n**${err}**`)
                        })

                }
                if (toggle) return message.channel.send("This server has the \"Staff\" module disabled")
            })

    }
}