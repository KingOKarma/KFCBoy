//WELCOME TO
//KFC Bucket Boi

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const mongoose = require("mongoose");


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
