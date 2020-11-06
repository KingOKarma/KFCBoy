//WELCOME TO
//KFC Bucket Boi

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const mongoose = require("mongoose");


let token = config.token
let prefix = config.prefix


//checks if bot version is dev or product
if (config.Version === "product") {
    const express = require('express');
    const http = require('http');
    
    const app = express();
    const server = http.createServer(app);


    const DBL = require("dblapi.js");
    let Topgg = config.topgg
    const dbl = new DBL(Topgg, { webhookAuth: "KFC", webhookServer: app }, bot);

    // Optional events
    dbl.on('posted', () => {
        console.log('Server count posted!');
    })

    dbl.on('error', e => {
        console.log(`Oops! ${e}`);
    })







    https://canary.discord.com/api/webhooks/703390149823823912/J1NJOdk0AJlhKV1lq4obT71KVFzC0eKJ96RLb2XvP-hnKRTaEsjXadgtUZz9z1pI2qvx

    dbl.webhook.on('ready', hook => {
        console.log(`Webhook running with path ${hook.path}`);
    });
    dbl.webhook.on('vote', async (voter) => {

        console.log('Listening');
        console.log(`${voter} has voted!`);
        let guild = client.guilds.cache.get(config.MainServerID)
        let channel = guild.channels.cache.get(config.VoteChannelID)


        const fetch = require('node-fetch');
        const config = require("../../config.json")


        const res = await fetch(
            `https://top.gg/api/users/${voter.user}`,
            {
                headers: {
                    'Authorization': `Authorization: ${config.Topgg_API_TOKEN}`
                }
            }
        );
        if (res.status !== 200) {
            throw new Error(`Received a ${res.status} status code`);
        }

        const body = await res.json();

        let tag = `${body.username}#${body.discriminator}`


        const embed = new Discord.MessageEmbed()

            .setAuthor(tag, `https://cdn.discordapp.com/avatars/${voter}/${body.avatar}.png`)
            .setDescription(`**${tag}** Has upvoted KFC Bucket Boy over at <https://top.gg/bot/614110037291565056>`)
            .setFooter("You can also vote it will make me very happy")

        channel.send(embed)


        // const message = new Discord.Message(bot, messageContent, channel)


    });



    app.get('/', (req, res) => {
        // ...
    });

    server.listen(5000, () => {


    })
}

let MongoToggle = config.tgtoggle
mongoose.connect(MongoToggle, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .catch(err => {
        console.error("mongoose error" + err);
    })



bot.on("error", (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));






const fs = require('fs'); // fs is the package we need to read all files which are in folders

fs.readdir(`./events/`, (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        bot.on(evtName, evt.bind(null, bot));
    });
});






const usedCommandRecentllytext = new Set();



bot.on("message", message => {
    //command handler




    if (message.channel.type == "dm") return;
    if (message.author.bot) return;

    const prefix = config.prefix;

    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandname = args.shift().toLowerCase();
    if (usedCommandRecentllytext.has(message.author.id)) {
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
        usedCommandRecentllytext.add(message.author.id);
        setTimeout(() => {
            usedCommandRecentllytext.delete(message.author.id)
        }, 3000);
    }
});





bot.login(token).catch(console.error)
