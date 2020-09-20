//WELCOME TO
//KFC Bucket Boi

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const mongoose = require("mongoose");
const Toggle = require("./models/toggle.js");
const Xp = require("./models/xp.js")


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

const usedCommandRecentlly = new Set();
bot.on('message', message => {



    if (message.channel.type == "dm") return;
    if (message.author.bot) return;

    const prefix = config.prefix;

    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandname = args.shift().toLowerCase();
    if (usedCommandRecentlly.has(message.author.id)) {
        message.reply("Woah there you can only use me so fast <a:kaineflushedeyes:708477282079211570> 3 seconds per command")

    } else {


        // const theUser = theUser
        const command = bot.commands.get(commandname) || bot.commands.get(bot.aliases.get(commandname));
        if (!command) return;
        try {

            isuser = false

            const UserArgs = message.content.slice(prefix.length).trim().split(/ +/g);



            if (isuser = false) {
                return console.log("not a thing")
            } if (isuser = true) {
                const user = message.mentions.users.first();
                // If we have a user mentioned
                if (user) {
                    // Now we get the member from the user
                    var theUser = message.guild.member(user);

                    // If the member is in the guild
                    if (!theUser) {
                        console.log("Mention Check")
                        message.reply("That user isn't in this guild!");
                    }
                } else {
                    console.log(UserArgs.join(' '))
                    if (UserArgs[1] === undefined) {

                    } else if (UserArgs[1].match(/\d{18}/)) {
                        console.log("ID Check")
                        var theUser = message.guild.members.cache.find(member => member.id === UserArgs[1])
                    }


                }
            }


            var realuser = message.guild.members.cache.filter(member => !member.user.bot).size


            console.log(`\n${message.author.tag} used the cmd: ${message.content}\n\n In the server ${message.guild.name} with ${realuser} members\n\n in the channel ${message.channel.name}\n`)

            command.run(bot, message, args, prefix, MongoToggle, theUser);
        } catch (error) {
            console.error(error);
        }
        usedCommandRecentlly.add(message.author.id);
        setTimeout(() => {
            usedCommandRecentlly.delete(message.author.id)
        }, 3000);
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
    const applyText = () => {
    };

    Canvas.registerFont('./fonts/Roboto-Regular.ttf', { family: 'fontFamily' });

    const background = await Canvas.loadImage('./discord/Discordwelcome2.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);


    //width lower the number = right
    //hight lower the number = lower

    // Slightly smaller text placed above the member's display name
    ctx.font = '30px sans-serif';
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

    let realuser = member.guild.members.cache.filter(member => !member.user.bot).size
    // Add an exclamation point here and below

    ctx.font = applyText(canvas, `You are member number ${realuser}`);
    ctx.font = '17px sans-serif';
    ctx.fillStyle = '#029911';
    ctx.fillText(`You are member number ${realuser}`, canvas.width / 1.5, canvas.height / 1.045);
    //darker 

    ctx.font = applyText(canvas, `You are member number ${realuser}`);
    ctx.font = '17x sans-serif';
    ctx.fillStyle = '#59c0eb';
    ctx.fillText(`You are member number ${realuser}`, canvas.width / 1.5, canvas.height / 1.05);
    //ligter 

    ctx.beginPath();
    ctx.arc(64, 200, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 30, 170, 64, 64);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Discordwelcome2.png');


    const embedjoin = new Discord.MessageEmbed()

        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Welcome <@${member.id}>, to the Karma Kingdom! <:Kainesip:706267804957016156>** \n**\`-\`[Twitch](https://www.twitch.tv/King_O_Karma)** and **[YouTube](https://www.youtube.com/channel/UCR8Mc2F5UV672cv3Z7KUn1g?view_as=subscriber)**\n \`-\`**[Invite me to your server!](https://invite.bucketbot.dev)**`)
        .setColor(member.guild.me.displayColor)
        .addField("info", "**You can get all the info you need at <#706291446252175400>** <:Kawaii:705565375647186984> \n If you have any questions just DM <@614469989134630944> \n And Finally you can go to <#684533907151913011> to assign yourself somes roles! <:Kainepog:709455703567499326>")
        .attachFiles(attachment)
        .setImage('attachment://sample.png');
    general.send(embedjoin)

    const Welcome = require("./models/welcome");

    Welcome.findOne({
        ServerID: member.guild.id,
    },
        (err, welcome) => {

            if (err) console.log(err);
            if (!welcome) {
                return
            } else if (welcome.WelcomePing === "NotSet") {
                return
            } else
                return general.send(`${welcome.WelcomePing} \nNew member!! come say hi `)
        })
});

bot.on('message', async message => {
    if (!message.author.id === "406211463125008386") return
    if (message.content === 'dev!join') {
        bot.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});


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

    //maybe do this one day
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
    const LogChannel = message.client.channels.cache.get("700438892888719501")

    if (message.content.toLowerCase() === "<@!614110037291565056>") {
        message.channel.send("My prefix is `k!` you can use `k!help` to view my commands (make sure dms are enabled to i can dm you the commands!)")
            .catch((err) => {
                console.log(`Error, \"Ping Help\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`)
                const ErrorEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                    .setColor("0xFF0000")
                    .setDescription(`\`\`\`Error, \"Ping Help\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                LogChannel.send(ErrorEmbed)

            })
        console.log("a")
    }


    const responseTime = Math.round(Date.now() - message.createdTimestamp); // This will round the response time between when the message was received and when the message was sent

    //You can display as
    if (message.content.startsWith(`${prefix}ping`)) {
        message.delete()
            .catch((err) =>
                console.log(err + "someone's ping perm go brr")
            )
        const pingf = await message.channel.send(`🏓 Pinging....`)
            .catch((err) => {
                const LogChannel = message.client.channels.cache.get("700438892888719501")

                console.log(`Error, \"Ping\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`);
                ErrorEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                    .setColor("0xFF0000")
                    .setDescription(`\`\`\`Error, \"Ping\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                LogChannel.send(ErrorEmbed)

            })

        if (pingf === undefined) return


        pingf.edit(`**Ping**🏓\n**Response time is:** ${responseTime}ms`)


    }
})
const usedCommandRecentllyk = new Set();
const usedCommandRecentllypp = new Set();
const usedCommandRecentllye = new Set();
bot.on('message', message => {
    if (message.channel.type == "dm") return;
    Toggle.findOne({
        ServerID: message.guild.id,
        Command: "Response"
    },
        (err, toggle) => {

            if (err) console.log(err);
            if (!toggle) {

                const LogChannel = message.client.channels.cache.get("700438892888719501")



                if (message.content.toLowerCase() === "k") {
                    if (usedCommandRecentllyk.has(message.author.id)) {

                    } else {
                        message.channel.send('Did you seriously just **"k"** BRUH :eyes:')
                            .catch((err) => {
                                console.log(`Error, \"K\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`)
                                ErrorEmbed = new Discord.MessageEmbed()
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                                    .setColor("0xFF0000")
                                    .setDescription(`\`\`\`Error, \"K\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                    .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                                LogChannel.send(ErrorEmbed)

                            })

                        usedCommandRecentllyk.add(message.author.id);
                        setTimeout(() => {
                            usedCommandRecentllyk.delete(message.author.id)
                        }, 3000);
                    }
                }
                if (message.content.toLowerCase() === "pp") {
                    if (usedCommandRecentllypp.has(message.author.id)) {

                    } else {
                        message.channel.send('My PP hurts man 🍆💦')
                            .catch((err) => {
                                console.log(`Error, \"PP\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`)
                                ErrorEmbed = new Discord.MessageEmbed()
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                                    .setColor("0xFF0000")
                                    .setDescription(`\`\`\`Error, \"PP\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                    .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                                LogChannel.send(ErrorEmbed)

                            })

                        usedCommandRecentllypp.add(message.author.id);
                        setTimeout(() => {
                            usedCommandRecentllypp.delete(message.author.id)
                        }, 3000);
                    }
                }
                if (message.content.toLowerCase() === "e") {
                    if (usedCommandRecentllye.has(message.author.id)) {

                    } else {
                        message.channel.send('https://www.dailydot.com/wp-content/uploads/2018/04/markiplierebig.png')
                            .catch((err) => {
                                console.log(`Error, \"E\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`)
                                ErrorEmbed = new Discord.MessageEmbed()
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                                    .setColor("0xFF0000")
                                    .setDescription(`\`\`\`Error, \"E\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                    .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                                LogChannel.send(ErrorEmbed)

                            })
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



    //yes its nested if statements, im lazy
    if (message.content.toLowerCase() == "dev") {
        message.author.send(`**Hello ${message.author.tag}! Would you like to send feedback to the dev?**\n*Please either answer with "yes" or "no".*`).then(() => {
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




const delaySet = new Set();

//xp system
bot.on("message", message => {
    if (message.channel.type == "dm") return;
    if (message.author.bot) return;


    Toggle.findOne({
        ServerID: message.guild.id,
        Command: "Xp"
    },
        (err, toggle) => {
            if (err) console.log(err);
            if (!toggle) {

                let xpGain = Math.ceil(message.content.length / 2)

                // if above 50, add 50
                if (xpGain > 51) {
                    console.log("more than 50")
                    xpGain = Math.ceil(+50)
                }
                Xp.findOne({
                    ServerID: message.guild.id,
                    UserID: message.author.id
                }, (err, xp) => {
                    if (err) console.log(err);

                    if (!xp) {
                        const newUser = new Xp({
                            UserID: message.author.id,
                            ServerID: message.guild.id,
                            xp: xpGain,
                            level: 0,
                            UserName: message.author.tag,
                            ServerName: message.guild.name,
                        })
                        newUser.save().catch(err => console.log(err))

                    } else if (xp.xp + xpGain >= xp.level * 200) {
                        if (usedCommandRecentlly.has(message.author.id)) {

                        } else {

                            const levelEmbed = new Discord.MessageEmbed();
                            xp.xp = xp.xp + xpGain;
                            xp.level = xp.level + 1;
                            xp.UserName = message.author.tag
                            xp.ServerName = message.guild.name
                            xp.save().catch(err => console.log(err));
                            console.log(`${message.author.tag} has ${xp.xp}xp and gained ${xpGain}xp, they are level ${xp.level}\n\n in the server "${message.guild.name}" and leveled up with the message\n\n${message.content}\n\n`)
                            levelEmbed.setTitle(`Leveled up to ${xp.level}`)
                                .setColor(message.guild.me.displayColor)
                                .setTimestamp()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL( {dynamic : true}));
                            message.channel.send(levelEmbed)
                            .catch(() =>
                            message.reply(`Congrats ${message.author.tag}! you're now level ${xp.level}`)
                            )
                            .catch(() => {
                            })

                            delaySet.add(message.author.id)

                            setTimeout(() => {

                                delaySet.delete(message.author.id)

                            }, 10000);//10 seconds till next xp add
                        }
                    } else {

                        if (delaySet.has(message.author.id)) {

                        } else {

                            xp.xp = xp.xp + xpGain;
                            xp.UserName = message.author.tag
                            xp.ServerName = message.guild.name


                            xp.save().catch(err => console.log(err))

                            delaySet.add(message.author.id)

                            setTimeout(() => {

                                delaySet.delete(message.author.id)

                            }, 10000);
                        }
                    }
                })
            }
            if (toggle) return 



        })


})


bot.login(token).catch(console.error)
