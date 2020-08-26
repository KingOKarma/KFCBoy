//WELCOME TO
//KFC Bucket Boi

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const mongoose = require("mongoose");
const Toggle = require("./models/toggle.js");
// const mysql = require("mysql");

let token = config.token
let prefix = config.prefix

const DBL = require("dblapi.js");
let Topgg = config.topgg
const dbl = new DBL(Topgg, bot);

// Optional events
dbl.on('posted', () => {
    console.log('Server count posted!');
})

dbl.on('error', e => {
    console.log(`Oops! ${e}`);
})


let MongoToggle = config.tgtoggle
mongoose.connect(MongoToggle, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.error("mongoose error" + err);
    })



bot.on('ready', async () => {

    const setCollections = require('./utils/collections');
    setCollections(bot);
    const commandHandler = require('./handlers/command');
    commandHandler(bot);


    console.log('Im Online now bois');

    console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);

    bot.user.setActivity(`DM ME "dev" TO SEND FEEDBACK, Also I'm inside ${bot.guilds.cache.size} servers and serveing ${bot.users.cache.size} users,`);

    bot.user.setPresence({
        activity:
        {
            name: `Prefix = "k!" || DM ME "dev" TO SEND FEEDBACK, Also I'm inside ${bot.guilds.cache.size} servers and serveing ${bot.users.cache.size} users,`,
            url: "https://www.twitch.tv/King_O_Karma",
            type: "WATCHING"
        }
    })
});


bot.on('message', message => {

    if (!message.channel.type == "dm") return;
    if (message.author.bot) return;
    // if (message.content == "<@614110037291565056>"){
    // return message.reply("My prefix is `k!` to start using my commands use k!help");
    // }

    const prefix = config.prefix

    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
    const commandname = args.shift().toLowerCase();

    const command = bot.commands.get(commandname) || bot.commands.get(bot.aliases.get(commandname));
    if (!command) return;
    try {
        command.run(bot, message, args, prefix, MongoToggle);
    } catch (error) {
        console.error(error);
    }

})



bot.on('guildMemberAdd', async member => {

    if (member.guild != "605859550343462912") return;
    const karmakingdom = member.guild.me.client.guilds.cache.find(guild => guild.id === "605859550343462912")
    const general = karmakingdom.channels.cache.find(channel => channel.id === "630881886725472256")
    const Discord = require("discord.js");
    const Canvas = require('canvas');


    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const applyText = (canvas, text) => {
    };

    Canvas.registerFont('./fonts/OpenSansEmoji.otf', { family: 'fontFamily' });

    const background = await Canvas.loadImage('./discord/Discordwelcome2.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    //width lower the number = right
    //hight lower the number = lower

    // Slightly smaller text placed above the member's display name
    ctx.font = '30px OpenSansEmoji.otf';
    ctx.fillStyle = '#029911';
    ctx.fillText('Welcome to the server,', canvas.width / 3.475, canvas.height / 1.325);
    //darker 

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#029911';
    ctx.fillText(`${member.displayName}!`, canvas.width / 3.025, canvas.height / 1.135);
    //darker 

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#59c0eb';
    ctx.fillText(`${member.displayName}!`, canvas.width / 3, canvas.height / 1.15);
    //lighter 

    ctx.font = applyText(canvas, 'Welcome to the server,');
    ctx.fillStyle = '#59c0eb';
    ctx.fillText('Welcome to the server,', canvas.width / 3.5, canvas.height / 1.35);
    //lighter 

    var realuser = member.guild.members.cache.filter(member => !member.user.bot).size
    // Add an exclamation point here and below

    ctx.font = applyText(canvas, `You are member number ${realuser}`);
    ctx.font = '17px OpenSansEmoji.otf';
    ctx.fillStyle = '#029911';
    ctx.fillText(`You are member number ${realuser}`, canvas.width / 1.5, canvas.height / 1.045);
    //darker 

    ctx.font = applyText(canvas, `You are member number ${realuser}`);
    ctx.font = '17x OpenSansEmoji.otf';
    ctx.fillStyle = '#59c0eb';
    ctx.fillText(`You are member number ${realuser}`, canvas.width / 1.5, canvas.height / 1.05);
    //ligter 

    ctx.beginPath();
    ctx.arc(125, 100, 200, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 50, 162.5, 85, 85);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Discordwelcome2.png');


    const embedjoin = new Discord.MessageEmbed()

        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Welcome ${`<@${member.id}>`}, to the Karma Kingdom! <:Kainesip:706267804957016156>** \n**\`-\`[Twitch](https://www.twitch.tv/King_O_Karma)** and **[YouTube](https://www.youtube.com/channel/UCR8Mc2F5UV672cv3Z7KUn1g?view_as=subscriber)**\n \`-\`**[Invite me to your server!](https://tinyurl.com/th2mlcn)**`)
        .setColor(member.guild.me.displayColor)
        .addField("info", "**You can get all the info you need at <#706291446252175400>** <:Kawaii:705565375647186984> \n If you have any questions just DM <@614469989134630944> \n And Finally you can go to <#684533907151913011> to assign yourself somes roles! <:Kainepog:709455703567499326>")
        .attachFiles(attachment)
        .setImage('attachment://sample.png');
    general.send(embedjoin)
})

bot.on('message', async message => {
    if (!message.author.id === "406211463125008386") return
    if (message.content === '!join') {
        bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});


// bot.on('message', message => { 


//     dbl.webhook.on('vote', vote => {
//         const karmakingdomjoin = message.guild.client.guilds.cache.find(guild => guild.id === "605859550343462912")

//         const channeljoin = karmakingdomjoin.channels.cache.find(channel => channel.id === "705232424132542474")

//         message.channeljoin.send(`User with ID ${vote.user} just voted!`);
//       })

// });


bot.on("guildCreate", guild => {


    const karmakingdomjoin = guild.client.guilds.cache.find(guild => guild.id === "605859550343462912")

    const channeljoin = karmakingdomjoin.channels.cache.find(channel => channel.id === "700438892888719501")

    const embed = new Discord.MessageEmbed()
        .setAuthor("KFC Bucket Boi", guild.client.user.displayAvatarURL())
        .setColor("0x36cbf5")
        .setDescription(`**KFC Bucket Boi has joined **\`${guild.name}\` **with the id of **\`${guild.id}\` \n Server owned by \`${guild.owner.user.tag}\` has \`${guild.memberCount}\` members`)
        .setThumbnail(guild.iconURL())
        .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
    channeljoin.send(embed)
    // var firstchannel = guild.channels.cache.map(channel => channel.name)
    // channeljoin.send(`<${firstchannel.createInvite.url}>`)


});


bot.on("guildDelete", guild => {


    const karmakingdomjoin = guild.client.guilds.cache.find(guild => guild.id === "605859550343462912")

    const channeljoin = karmakingdomjoin.channels.cache.find(channel => channel.id === "700438892888719501")

    const embed = new Discord.MessageEmbed()
        .setAuthor("KFC Bucket Boi", guild.client.user.displayAvatarURL())
        .setColor("0xFF0000")
        .setDescription(`**KFC Bucket Boi has left **\`${guild.name}\` **with the id of **\`${guild.id}\` \n Server owned by \`${guild.owner.user.tag}\` has \`${guild.memberCount}\` members`)

        .setThumbnail(guild.iconURL())
        .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
    channeljoin.send(embed)



});

bot.on("message", async message => {

    const apiPing = Math.round(message.client.ping); // This will round the api ping of the client
    const responseTime = Math.round(Date.now() - message.createdTimestamp); // This will round the response time between when the message was received and when the message was sent

    //You can display as


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.content.startsWith(`${prefix}ping`)) {
        message.delete();
        const pingf = await message.channel.send(`🏓 Pinging....`);

        pingf.edit(`**Ping**🏓\n**Response time is:** ${responseTime}ms\n**API Latency is:** ${Math.round(apiPing)}ms`);


    }
})
bot.on('message', message => {
    if (message.channel.type == "dm") return;
    Toggle.findOne({
        ServerID: message.guild.id,
        Command: "Response"
    },
        (err, toggle) => {

            if (err) console.log(err);
            if (!toggle) {



                const usedCommandRecentllyk = new Set();
                if (message.content.toLowerCase() === "k") {
                    if (usedCommandRecentllyk.has(message.author.id)) {

                    } else {
                        message.channel.send('Did you seriously just **"k"** BRUH :eyes:')

                        usedCommandRecentllyk.add(message.author.id);
                        setTimeout(() => {
                            usedCommandRecentllyk.delete(message.author.id)
                        }, 3000);
                    }
                }
                const usedCommandRecentllypp = new Set();
                if (message.content.toLowerCase() === "pp") {
                    if (usedCommandRecentllypp.has(message.author.id)) {

                    } else {
                        message.channel.send('My PP hurts man 🍆💦')

                        usedCommandRecentllypp.add(message.author.id);
                        setTimeout(() => {
                            usedCommandRecentllypp.delete(message.author.id)
                        }, 3000);
                    }
                }
                const usedCommandRecentllye = new Set();
                if (message.content.toLowerCase() === "e") {
                    if (usedCommandRecentllye.has(message.author.id)) {

                    } else {
                        message.channel.send('https://www.dailydot.com/wp-content/uploads/2018/04/markiplierebig.png')

                        usedCommandRecentllye.add(message.author.id);
                        setTimeout(() => {
                            usedCommandRecentllye.delete(message.author.id)
                        }, 3000);
                    }
                }
            }
            if (toggle) return


        })
})


bot.on('message', message => {
    if (message.author.id == "642168897625260052") return message.author("you have been banned from sending feedback, please contact the dev if you wish to regain access");
    if (message.channel.type != "dm") return;
    if (message.author.bot) return;


    const karmakingdom = message.client.guilds.cache.find(guild => guild.id === "605859550343462912")

    const channel = karmakingdom.channels.cache.find(channel => channel.id === "699030000753442867")



    if (message.content.toLowerCase() == "dev") {
        message.author.send(`**Hello ${message.author.tag}! Would you like to send feeback to the dev?**\n*Please either answer with "yes" or "no".*`).then(() => {
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);
            collector.once("collect", message => {
                if (message.content.toLowerCase() == "yes") {
                    message.channel.send(`**Just to clarify one more time, as this goes into a public server are you 100% sure?**\n*Please either answer with "yes" or "no".*`).then(() => {
                        const collector2 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);
                        collector2.once("collect", message => {
                            if (message.content.toLowerCase() == "yes") {
                                message.channel.send(`**Alrighty we're all set, just type out your feedback and it will be sent, no going back now 👀**`).then(() => {
                                    const collector4 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id)
                                    collector4.once("collect", message => {
                                        const feedback = message.content;
                                        message.channel.send(`> **Your message has been sent to the support server at <https://discord.gg/2aSaqAg> **\n~~**This bot was brought to you by King Of Karma#0069**~~`)
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                            .setColor("0x36cbf5")
                                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                                            .setDescription(`**${message.author.tag} has suggested:**`)
                                            .addField('\u200b', `${feedback}`)
                                            .setFooter(`You can dm the bot "dev" to send feedback`)
                                        channel.send(embed)
                                    })
                                })
                            } else {
                                message.channel.send(`**Aight that wasn't a \`yes\`...so enjoy the rest of your day!**`)
                            }
                        })
                    })

                } else {
                    message.channel.send(`**That was not a \`yes\` so Bye Bye then!**`)
                }
            })
        })

    }

})






// bot.on('message', message => {

//     if (message.author.bot) return;
//     if (message.channel.type == "dm") return;
//     if (message.content.indexOf(prefix) !== 0) return;


//     let args = message.content.substring(prefix.length).trim().split(/ +/g);
//     const cmd = args.shift().toLowerCase();

//     mention = message.mentions.users.first();

//     switch (cmd) {
//         //Utility

//         case 'whois':
//             bot.commands.get('whois').execute(message, args);

//             break;

//         case 'membercount':
//             bot.commands.get('membercount').execute(message, args);

//             break;

//         case 'test':
//             message.channel.send(`<#630881886725472256> ,${message.author}, <:kfc:612074164211286027> `)

//             break;

//         case 'help':
//             bot.commands.get('help').execute(message, args);

//             break;

//         case 'pong':
//             message.reply('Do you mean ping?');

//             break;

//         case 'invite':
//             bot.commands.get('invite').execute(message, args);

//             break;

//         case 'support':
//             bot.commands.get('support').execute(message, args);

//             break;

//         //Misc


//         case 'kk':
//             bot.commands.get('kk').execute(message, args);

//             break;

//         case 'info':
//             bot.commands.get('info').execute(message, args, bot);

//             break;

//         case 'avatar':
//             bot.commands.get('avatar').execute(message, args);

//             break;

//         case 'image':
//             bot.commands.get('image').execute(message, args);

//             break;

//         case 'cute':
//             bot.commands.get('cute').execute(message, args);

//             break;

//         case 'marshmallow':
//             bot.commands.get('marshmallow').execute(message, args);

//             break;

//         case 'evergarden':
//             bot.commands.get('evergarden').execute(message, args);

//             break;

//         case 'karma':
//             bot.commands.get('karma').execute(message, args);

//             break;

//         case 'kids':
//             bot.commands.get('kids').execute(message, args);

//             break;

//         case 'say':
//             bot.commands.get('say').execute(message, args);

//             break;

//         case 'embed':
//             bot.commands.get('embed').execute(message, args);

//             break;

//         case 'cool':
//             bot.commands.get('cool').execute(message, args);

//             break;

//         case 'servers':
//             bot.commands.get('servers').execute(message, args, bot);

//             break;

//         //Interactable
//         case 'hug':
//             bot.commands.get('hug').execute(message, args, prefix);

//             break;

//         case 'kiss':
//             bot.commands.get('kiss').execute(message, args)

//             break;
//         //Staff
//         case 'purge':
//             bot.commands.get('purge').execute(message, args);

//             break;

//         case 'prefix':
//             bot.commands.get('prefix').execute(message, args);

//             break;









bot.login(token).catch(console.error)
