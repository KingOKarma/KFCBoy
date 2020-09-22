
const Discord = require("discord.js")
module.exports = {
    name: 'webhook',
    run: async (_, message, args, bot, token, client) => {
        if (message.author.id != "406211463125008386") return message.channel.send("This is a Owner only comamnd! <:Kaineshrug:711591140125704242>")

        if (message.channel.fetchWebhooks()
        
        
        ) {
            message.channel.createWebhook("test");
            message.channel.send("No Current Webhook found, Creating new one...");
            console.log("Created Webhook")

        }


        const embed = new Discord.MessageEmbed()
            .setTitle('Some Title')
            .setColor('#0099ff');


        const webhooks = await message.channel.fetchWebhooks();
        const webhook = webhooks.first();
        await webhook.send('Webhook test', {
            username: 'some-username',
            avatarURL: 'https://i.imgur.com/wSTFkRM.png',
            embeds: [embed],
            
        });
        


    }
}