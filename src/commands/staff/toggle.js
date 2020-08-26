const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
const { endianness } = require("os");
const { exit } = require("process");



module.exports = {
    name: 'toggle',
    aliases: ["tg"],
    run: (_, message, args, bot, prefix) => {
        if (!message.member.permissionsIn(message.channel).has("MANAGE_GUILD")) return message.channel.send("You need the permission __**\"Mange Server\"**__ to use this command")
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"EMBED_LINKS\"**__ to use this command")

        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => {
            console.error("mongoose error" + err);
        })



        switch (args[0]) {


            case `responder`:
                console.log("Response found")
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("Auto responders have been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "Response"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("Auto responders have been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })


                        }
                    })


                break;
            case "fun":
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("The Fun module has been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "Fun"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("The Fun module has been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })




                        }
                    })
                break;

            case "image":
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("The Image module has been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "Image"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("The Image module has been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })




                        }
                    })
                break;

            case "info":
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("The Info module has been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "Info"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("The Info module has been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })




                        }
                    })

                break;

            case "interactable":
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("The Interactable module has been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "Interactable"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("The Interactable module has been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })




                        }
                    })

                break;

            case "kfc":
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("The KFC module has been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "KFC"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("The KFC module has been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })




                        }
                    })

                break;
            case "minecraft":
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("The Minecraft module has been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "Minecraft"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("The Minecraft module has been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
                                .catch((err) => {
                                    console.log(err)
                                })




                        }
                    })

                break;
            case "utility":
                Toggle.findOne({
                    ServerID: message.guild.id,
                },
                    (err, toggle) => {

                        if (err) console.log(err);
                        if (!toggle) {
                            message.channel.send("The Utility module has been disabled")
                            const newToggle = new Toggle({
                                ServerID: message.guild.id,
                                Command: "Utility"
                            })

                            newToggle.save().catch(err => console.log(err));


                            return

                        } if (toggle) {
                            message.channel.send("The Utility module has been enabled")
                            Toggle.deleteOne({ ServerID: message.guild.id })
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
                    .setDescription("List of Modules: \n __fun__\n__image__\n__info__\n__interactable__\n__kfc__\n__minecraft__\n__utility__\n__responder__")
                    .setFooter("Use `k!tg <module name>` to toggle the modules")


                message.channel.send(embed)
                break;


        }










    }
}