const Discord = require("discord.js")
module.exports = {
    name: 'restart',
    aliases: ["reboot"],
    run: async (_, message, args, bot, token, client) => {
        if(!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        if (message.author.id != "406211463125008386") return message.channel.send("This is a Owner only comamnd! <:Kaineshrug:711591140125704242>")

        var pm2 = require('pm2');

        pm2.connect(function (err) {
            if (err) {
                console.error(err);
                process.exit(0);
            }

            pm2.restart('KFCboy', function (err) {
                pm2.disconnect();   // Disconnects from PM2
                if (err) throw err
            });
        });



        // const usedCommandRecentllyk = new Set();
        // if (usedCommandRecentllyk.has(message.author.id)) {

        // } else {
            const embed = new Discord.MessageEmbed()
            .setDescription(`✅ **Restarting...** <:Kainesip:706267804957016156> \n*Try using a command in about 5 seconds, if no response please check logs!* <:Kainestrawsip:706270948365566066>`)

        message.channel.send(embed)
    }



}
