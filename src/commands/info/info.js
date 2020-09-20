const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");



module.exports = {
    name: 'info',
    aliases: ["botinfo", "bot"],
    run: (_, message, args, bot) => {
        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")


        // let repadd = "On"
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Info"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    // case true: {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('User/Bot Information')
                        .setThumbnail(`${message.guild.iconURL({ dynamic: true })}?size=1024`)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setColor(message.guild.me.displayColor)
                        .setDescription("KFC Bucket Boy is your new best friend!\nBot owned and written by <@406211463125008386> **King Of Karma#0069**")
                        .setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}?size=1024.png`)
                        .addField('Current Server', message.guild.name, true)
                        .addField(`Your ID`, message.author.id, true)
                        .addField('Serving', `${message.client.users.cache.size} users`, true)
                        .addField('Looking at', `${message.client.channels.cache.size} channels`, true)
                        .addField('Library', `Discord.js`, true)
                        .addField('Language', `Javascript`, true)
                        .addField('Support Server', `[Click Here](https://support.bucketbot.dev)`, true)
                        .addField('Invite Me', `[Click Here](https://invite.bucketbot.dev)`, true)
                        .addField('Website', `[Click Here](https://bucketbot.dev)`, true)
                        .addField('Top.gg', `[Click Here](https://top.gg/bot/614110037291565056)`, true)
                        .addField('Donate', `[Click Here](https://donatebot.io/checkout/605859550343462912?buyer=${message.author.id})`, true)
                        .addField('Free RAM', '[Click Here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)', true)
                    message.channel.send(embed);

                }
                if (toggle) return message.channel.send("This server has the \"Info\" module disabled")

            })







    }
}
