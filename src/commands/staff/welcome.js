const Discord = require("discord.js");
const Welcome = require("../../models/welcome.js");
module.exports = {
    name: 'welcome',
    aliases: ["welc"],
    run: (_, message, args, bot, prefix) => {
        if (!message.member.permissionsIn(message.channel).has("MANAGE_GUILD")) return message.channel.send("You need the permission __**\"Mange Server\"**__ to use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"EMBED_LINKS\"**__ to use this command")




        switch (args[0]) {

            case 'set':
                console.log("args0: " + args[0])
                console.log("args1: " + args[1])

                var WelcPing = "nope"

                if (args[1] === undefined) {
                    return message.reply("Please Mention a role either by ID or mention!")
                }

                else if (args[1].match(/^<@&?(\d+)>$/)) {
                    console.log("Mention Check")
                    var WelcPing = args[1]

                } else if (args[1].match(/\d{18}/)) {
                    console.log("ID Check")
                    var WelcPing = message.guild.roles.cache.find(role => role.id === args[1])

                    if (WelcPing === undefined) {
                        message.reply("Please only use the id of a role")
                        return
                    }

                }

                Welcome.findOne({
                    ServerID: message.guild.id,
                },
                    (err, welcome) => {

                        if (WelcPing === "nope") {
                            message.reply("Please Mention a role either by ID or mention!")
                            return
                        }
                        console.log("Welcome ping = " + WelcPing)

                        if (err) console.log(err);
                        if (!welcome) {

                        } else if (welcome) {

                            welcome.WelcomePing = WelcPing;

                            // welcome.WelcomePing = welcome.WelcomePing + WelcPing;
                            welcome.save().catch(err => console.log(err));

                        }
                        let WelcomeEmbed = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setColor(message.guild.me.displayColor)
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                            .setTitle(`${message.author.username} Welcome ping:`)
                        if (!welcome) {
                            WelcomeEmbed.addField("Ping", "Welcome ping Disabeld, you can enable it with `k!welcome toggle`", true);
                            return message.channel.send(WelcomeEmbed);

                        } else {
                            WelcomeEmbed.addField("Ping", welcome.WelcomePing, true);
                            return message.channel.send(WelcomeEmbed);

                        }


                    })

                break;


            case 'info':

                Welcome.findOne({

                    ServerID: message.guild.id,

                },
                    (err, welcome) => {
                        if (err) console.log(err);

                        let WelcomeEmbed = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setColor(message.guild.me.displayColor)
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                            .setTitle(`${message.author.username} Welcome ping:`)
                        if (!welcome) {
                            WelcomeEmbed.addField("Ping", "Welcome ping Disabeld, you can enable it with `k!welcome toggle`", true);
                            return message.channel.send(WelcomeEmbed);

                        } else if (welcome.WelcomePing === "NotSet") {
                            WelcomeEmbed.addField("Ping", "Unset, use `k!welcome set <ping>` eg: `k!welcome set 463657894567658457`", true);
                            return message.channel.send(WelcomeEmbed);

                        } else {
                            WelcomeEmbed.addField("Ping", welcome.WelcomePing, true);
                            return message.channel.send(WelcomeEmbed);

                        }


                    })
                break;

            case `toggle`:
                console.log("Welcome toggled")
                Welcome.findOne({
                    ServerID: message.guild.id,
                },
                    (err, welcome) => {

                        if (err) console.log(err);
                        if (!welcome) {
                            message.channel.send("Welcome ping has been enabled")
                            const newWelcome = new Welcome({
                                ServerID: message.guild.id,
                                WelcomePing: "NotSet",
                            })

                            newWelcome.save().catch(err => console.log(err));


                            return

                        } if (welcome) {
                            message.channel.send("Welcome ping has been disabled and Welcome Ping has been reset")
                            welcome.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })


                        }
                    })


                break;


            default:
                const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
                    .setColor(message.guild.me.displayColor)
                    .setDescription("You can toggle the \"Welcome ping\" with `k!welcome toggle`, a Role is formatted like this <&RoleID> so you would run the command like this `k!welcome set <@&605902511429124129>`\n You can also use `k!welcome info` to check your current welcome ping!")
                    .setFooter("Use `k!welcome <welcome ping>")


                message.channel.send(embed)
                break;


        }










    }
}