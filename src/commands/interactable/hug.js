const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'hug',

    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Interactable"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    const embed = new Discord.MessageEmbed();

                    msg = message.content.toLowerCase();






                    let huggif = ['https://media.giphy.com/media/wnsgren9NtITS/giphy.gif',
                        'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
                        'https://media.giphy.com/media/kvKFM3UWg2P04/giphy.gif',
                        'https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif',
                        'https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif',
                        'https://media.giphy.com/media/GXFDStd2CP1ba/giphy.gif',
                        'https://media.giphy.com/media/Z5SMZDDtlPgL6/giphy.gif',
                        'https://i.imgur.com/FxcGzhH.gif',
                        'https://media.giphy.com/media/3OCOHkV0ZOZ2g/giphy.gif',
                        'https://media.giphy.com/media/gl8ymnpv4Sqha/giphy.gif',
                        'https://media.giphy.com/media/QpAkCCGu2saR2/giphy.gif',
                        'https://media.giphy.com/media/RFxE6d7EuTCgw/giphy.gif',
                        'https://media.giphy.com/media/1MI7djBqXTWrm/giphy.gif',
                        'https://media.giphy.com/media/du8yT5dStTeMg/giphy.gif',
                        'https://media0.giphy.com/media/ddGxYkb7Fp2QRuTTGO/source.gif',
                        'https://i.pinimg.com/originals/a4/13/4f/a4134f06e210a7540ca20ae165dc457f.gif',
                        'https://media.giphy.com/media/q3kYEKHyiU4kU/giphy.gif',
                        'https://media2.giphy.com/media/IRUb7GTCaPU8E/giphy.gif?cid=ecf05e47femm1mqplb9w42k69r530dj2x9zm8kfvjsjwt824&rid=giphy.gif',
                        'https://cdn.myanimelist.net/s/common/uploaded_files/1460988091-6e86cd666a30fcc1128c585c82a20cdd.gif',
                        'https://3.bp.blogspot.com/-MSPnEAxXGD8/V-QcqonOHZI/AAAAAAAADzk/wlNK64qJnTYhPDJJKXpgDUHDpeM-E6dKwCLcB/s1600/lucy%2Band%2Bnatsu.gif',];
                    let huggifsend = huggif[Math.floor(Math.random() * huggif.length)];
                    console.log(huggifsend)

                    if (theUser) {
                        var targetUser = theUser.user

                    }


                    if (args[0] === undefined) {
                        embed
                            .addField("**Huggy**", `**Aww ${message.author} wants to hug themself, Here have a hug**`)
                            .setImage(huggifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    }
                    else if (targetUser === undefined) {
                        embed
                            .addField("**Huggy**", `**Aww ${message.author} wants to hug themself, Here have a hug**`)
                            .setImage(huggifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    } else if (theUser.id === message.author.id) {
                        embed
                            .addField("**Huggy**", `**Aww ${message.author} wants to hug themself, Here have a hug**`)
                            .setImage(huggifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return

                    } else if (theUser.id === "614110037291565056") {
                        embed
                            .addField("**Huggy**", `**You'd hug me** 😳`)
                            .setImage(huggifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return

                    } else {
                        embed
                            .addField("**Huggy**", `**${message.author} has hugged ${targetUser.tag}**`)
                            .setImage(huggifsend)
                            .setColor(message.guild.me.displayColor)
                        message.channel.send(embed);
                        return
                    }



                }
                if (toggle) return message.channel.send("This server has the \"Interactable\" module disabled")
            })





    }
}

