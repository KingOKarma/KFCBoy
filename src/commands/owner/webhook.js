<<<<<<< HEAD
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
        






        // var request = new XMLHttpRequest();
        // request.open("POST", "https://discordapp.com/api/webhooks/676118118082281513/ZS5YcWhurzokBrKX9NgexqtxrJA5Pu2Bo4i7_JsIxC-JIbPBVhSZkcVVukGOro52rnQA");

        // request.setRequestHeader('Content-type', 'application/json');

        // var params = {
        //   username: "My Webhook Name",
        //   avatar_url: "",
        //   content: "The message to send"
        // }






        //   const config = require('../../config.json');

        // const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

        // const embed = new Discord.MessageEmbed()
        //     .setTitle('Some Title')
        //     .setColor('#0099ff');

        // webhookClient.send('Webhook test', {
        //     username: 'some-username',
        //     avatarURL: 'https://i.imgur.com/wSTFkRM.png',
        //     embeds: [embed],
        // });

    }
=======
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
        






        // var request = new XMLHttpRequest();
        // request.open("POST", "https://discordapp.com/api/webhooks/676118118082281513/ZS5YcWhurzokBrKX9NgexqtxrJA5Pu2Bo4i7_JsIxC-JIbPBVhSZkcVVukGOro52rnQA");

        // request.setRequestHeader('Content-type', 'application/json');

        // var params = {
        //   username: "My Webhook Name",
        //   avatar_url: "",
        //   content: "The message to send"
        // }






        //   const config = require('../../config.json');

        // const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

        // const embed = new Discord.MessageEmbed()
        //     .setTitle('Some Title')
        //     .setColor('#0099ff');

        // webhookClient.send('Webhook test', {
        //     username: 'some-username',
        //     avatarURL: 'https://i.imgur.com/wSTFkRM.png',
        //     embeds: [embed],
        // });

    }
>>>>>>> 1d8f74316a85e34291c717bf30302ea2eab6a87d
}