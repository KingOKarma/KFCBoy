
const Discord = require('discord.js'); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require('../config.json');




module.exports = async (bot, reaction, user) => {  



        //🔫  ❕  🚙  <a:flushedawkward:662422827051384832> 
        // <:perish:663227738970128384>  🤽  🐟  🍏  ✈️  ⛱️  
        //🌵  🌹  🌇  ⚫  <:Kainesip:706267804957016156>  <:owo:764256375001317388> 🟠
        //|| '🔫' || '❕' || '🚙' || 'flushedawkward' || 'perish' || '🤽' || '🐟' || '🍏' || '✈️' || '⛱️' || '🌵' || '🌹' || '🌇' || '⚫' || 'Kainesip' || 'owo'

        const karmakingdom = bot.guilds.cache.find(guild => guild.id === "605859550343462912")


        const channel = karmakingdom.channels.cache.find(channel => channel.id === "757416295636402198")

        
        console.log(karmakingdom.name)

        if (channel.id != "757416295636402198") return
        else {

            channel.messages.fetch("764254540287443016")
            .then((message) => {


                const member = karmakingdom.members.cache.find(member => member.id === user.id);

            message.awaitReactions((reaction) => (reaction.emoji.name == '🟠'|| '🔫' || '❕' || '🚙' || 'flushedawkward' || 'perish' || '🤽' || '🐟' || '🍏' || '✈️' || '⛱️' || '🌵' || '🌹' || '🌇' || '⚫' || 'Kainesip' || 'owo'),
                { max: 1, time: 30000 }).then(collected => {
                    if (collected.first().emoji.name == '🟠') {
                        const theRole = karmakingdom.roles.cache.get("662325671304888348")
                        member.roles.add("662325671304888348")
                        member.user.send(`You have received the ${theRole.name}`)
                    } else if (collected.first().emoji.name == "🔫") {

                        console.log("Gun gang")

                    }
                    else {
                        console.log("Else?")
                    }
                }).catch(() => {
                });

            })

        }




}