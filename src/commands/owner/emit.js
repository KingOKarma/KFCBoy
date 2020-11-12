const Discord = require("discord.js")
const config = require('../../config.json')


module.exports = {
    name: 'emmit',
    aliases: ["emit", "do"],
    run: async (bot, message, args, prefix, MongoToggle) => {


        if (message.author.id != "406211463125008386") {
            message.reply("Sorry This command can only be used by Kaine >:( this is just so you guys dont break anything!")
            return
        }

        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        if (args[0] === undefined) return message.reply("Hey poopy dev thats not something to emit!")


        switch (args[0]) {


            case "join": {
                console.log("attempting join....")
                bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
            
                break;
            }

            case "massjoin": {
                console.log("attempting mass join....")
                bot.emit('guildMembersChunk', message.guild.members.cache.random(10) && message.guild.members.cache.get("614110037291565056"), "the uwu server");
                
                break;
            }


            default: {
                message.reply("What?")
                break;
            }









        }








    }

}