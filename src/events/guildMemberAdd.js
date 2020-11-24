
const Discord = require('discord.js'); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require('../config.json');
const message = require('./message');




module.exports = {
    name: "guildMemberAdd",
    run: async (bot, member) => {
        console.log(member)

        if (member.user.bot) return;

        if (member.guild.id != "605859550343462912") return console.log("Bots are not people smh");
        const karmakingdom = member.guild.me.client.guilds.cache.find(guild => guild.id === "605859550343462912")
        const general = karmakingdom.channels.cache.find(channel => channel.id === config.general)
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
            .addField("info", "**You can get all the info you need at <#706291446252175400>** <:Kawaii:705565375647186984> \n If you have any questions just DM <@614469989134630944> \n And Finally you can go to <#757416295636402198> to assign yourself somes roles! <:Kainepog:709455703567499326>")
            .attachFiles(attachment)
        // .setImage('/home/karma/bots/KFCBoy/src/images/Discordwelcome2.png');
        general.send(embedjoin)

        const Welcome = require("../models/welcome");

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




        if (member.guild.channels.cache.find(channel => channel.name === `verify-${member.user.id}`)) {
            member.guild.channels.cache.find(channel => channel.name === `verify-${member.user.id}`).overwritePermissions([
                {
                    id: member.user.id,
                    deny: ['ADD_REACTIONS', "ATTACH_FILES", "SEND_MESSAGES"],
                    allow: ["VIEW_CHANNEL"],
                },
                {
                    id: member.guild.id,
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: bot.user.id,
                    deny: ['ADD_REACTIONS', "ATTACH_FILES"],
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                },
            ],
            )


        } else {

            member.guild.channels.create(`verify-${member.user.id}`, {
                parent: "748926974113742939", reason: "Verifcation", permissionOverwrites: [
                    {
                        id: member.user.id,
                        deny: ['ADD_REACTIONS', "ATTACH_FILES", "SEND_MESSAGES"],
                        allow: ["VIEW_CHANNEL"],
                    },
                    {
                        id: member.guild.id,
                        deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: bot.user.id,
                        deny: ['ADD_REACTIONS', "ATTACH_FILES"],
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    },
                ],
            })
        }

        setTimeout(() => {

            const VerifyChannel = member.guild.channels.cache.find(channel => channel.name === `verify-${member.user.id}`)
            const Emote = member.guild.emojis.cache.get('754475822110474312')
            VerifyChannel.send(`${member}` + " Please react with <:KaineCool:754475822110474312> to get verified for the server! and get access to our very cool other channels!!")
                .then((theMessage) => {
                    theMessage.react(Emote)

                    theMessage.awaitReactions((reaction, user) => user.id == member.user.id && (reaction.emoji.id === '754475822110474312'),
                        { max: 1 }).then(collected => {
                            if (collected.first().emoji.id === '754475822110474312') {
                                VerifyChannel.send('Great You\'re now verified! let me just give you your role!');
                                let Verifyrole = member.guild.roles.cache.find(role => role.id === "613861902082244693");
                                member.roles.add(Verifyrole, "They have verified!")


                                setTimeout(() => {

                                    VerifyChannel.delete()

                                }, 5000);

                                return
                            } else {
                                VerifyChannel.send("From the looks if it there was a problem? Please contact staff immediately")
                            }

                        });
                })
                .catch((err) => {
                    VerifyChannel.send("I don\'t seem to have the permissions Manage Roles or Manage Channels, can you contact staff to fix this immediately?  I want to let you join the server 🥺 \n Logged reason:" + err)
                });




        }, 500);








        const embed = new Discord.MessageEmbed() // Create a new RichEmbed
            .setColor('GREEN')
            .setTimestamp()
            .setFooter(`ID: ${message.id}`)
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Member Joined!`)
            .setDescription(`Ping: ${member}`);

        member.guild.channels.cache.find(channel => channel.id === '660595725134069760').send({
            embed
        });









    }
}



