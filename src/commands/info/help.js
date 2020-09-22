const Discord = require("discord.js")
module.exports = {
    name: 'help',
    aliases: ["h"],
    run: (_, message, args) => {


        const LogChannel = message.client.channels.cache.get("700438892888719501");

        message.delete()
            .catch(err => {
                console.log(err)
            });
        const embed = new Discord.MessageEmbed()
            .setTitle('**Commands Available for KFC Bucket Boi**')
            .setColor(0x36cbf5)
            .addField('__Current Server__', message.guild.name)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setAuthor('Creator: King Of Karma#0069', 'https://karmakingdom.weebly.com/uploads/1/3/1/7/131732357/published/pfp.png?1587066957')
            .setDescription(`**Home Server:** https://discord.gg/nQRC3SRUse \n **Invite at:** https://invite.bucketbot.dev  \n the Prefix \`k!\` at the start of the command to use the command eg "k!ping"`,)
            .addField('**[📚] __Info Commands__**', '```These commands give you some info```')
            .addField('help', '- Brings up this menu in your DMs \n**alias: k!h**', true)
            .addField('info', '- Info about the bot \n**aliases: k!botinfo, k!bot**', true)
            .addField('invite', '- A link to invite me to your servers! \n**aliases: k!iv, k!ivt, k!invt**', true)
            .addField('support', '- You can make me post the link to my support/home server!', true)
            .addField('membercount ', '- Displays the amount of members/humans/bots in the server \n**aliases: k!members, k!countmembers**', true)
            .addField('servers ', '- Displays how many servers I am in \n**alias: k!guilds**', true)
            .addField('vote', '- Obtain a link to vote for me at top.gg \n**aliases: k!upvote, k!discord**')
            .addField('\u200b', '\u200b')

            .addField('**[🔨] __Utility Commands__**', '```These commands are used to be useful in certain situaions```')
            .addField('whois', "- Displays a user's userinfo, roles, perms, etc \n**aliases k!userinfo, k!whois**", true)
            .addField('ping', "- Bot's latency", true)
            .addField('avatar ', "- Displays a user's display avatar (pfp) \n**alias: k!av**", true)
            .addField('say', "- I will say what you want!\n**alias: k!s**", true)
            .addField('embed ', "- I will say what you want but as an embed! \n**alias: k!eb**", true)
            .addField('\u200b', '\u200b')

            .setFooter('Use the Prefix `k!` at the start of the command to use the command eg "k!ping"')





        message.author.send(embed)
            .catch(err => {
                message.reply(`I was unable to DM you ${message.author}.\nMake sure your dms are enabled!`)
                console.log(`Error, \"Help cmd\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}`)
                const ErrorEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL(({ dynamic: true })))
                    .setColor("0xFF0000")
                    .setDescription(`\`\`\`Error, \"Help cmd\" Failed Reason: ${err} \nMessageAuthor : ${message.author.tag}\nGuild : ${message.guild.name}\`\`\``)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setFooter(`This bot was brought to you by King Of Karma#0069`, `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`)
                LogChannel.send(ErrorEmbed)
                return
            });

        const embed2 = new Discord.MessageEmbed()
        embed2
            .setColor(0x36cbf5)
            .addField('**[🎉] __Fun Commands__**', '```These commands are here for your entertainment```')
            .addField('shuffle ', "- Plays the guessing game where you choose 1, 2 or 3\n**aliases: k!shufflehat, k!sh**", true)
            // .addField('mc ', "-  Displays the information on the offical Karma Kraft Minecraft server!\n**alias: k!server**", true)
            .addField('cool ', "- Learn how to be cool! 😎", true)
            .addField('kids ', "- Displays how many kids the second argument will have (e.g. k!kids Kaine) \n**aliases: k!kid, k!children**", true)
            .addField('kk ', "- Thats racist", true)
            .addField('8ball', "- Get your fortune \n**aliases: k!eightball k!fortune**", true)
            .addField('dadjoke', "- Yes this is a command with over 30 responses \n**alias: k!dad**", true)
            .addField('comment', "- Sends your message as a Youtube comment \n **alias: k!cm**")
            .addField('\u200b', '\u200b')



            .addField('**[📷] __Image Commands__**', '```These are the commands that display images```')
            .addField('emote', '- Will display an emote of your choice \n **aliases: k!emotes, k!emoji**')
            // .addField('image', '- It will send whatever you ask it to send (e.g k!image pillows) \n**aliases: k!pic, k!picture**', true)
            .addField('karma', "- I'll send you a media file from **King of Karma's** personal folder (;\n**alias: k!kaine**", true)
            .addField('meme', "- I'll give you a meme from a few select subreddits \n**alias: k!memes**", true)
            .addField('wholesome', "- I'll give you a meme from a wholesome subreddit \n**alias: k!cute**", true)

            .addField('\u200b', '\u200b')
            .addField('**[👇] __Interaction Commands__**', '```These comamnds used for interacting with other users```')
            .addField('hug', 'Hug a user of your choice!', true)
            .addField('kiss', 'Kiss someone <a:kaineflushedeyes:708477282079211570>', true)
            .addField('bucket', 'Give someone a wonderful hat! my favourite kind! \n**alias: k!hat**', true)
            .addField('rep', 'Allows you to add rep to any user \n**aliases: k!addrep, k!plusrep**', true)
            .addField('viewrep', 'Allows you to see how much rep a user has \n**alias: k!repview**', true)
            .addField('pp', 'Find a user\'s pp size \n**alias: k!size**', true)
            .addField('\u200b', '\u200b')

        // .addField('**[⏳] __Weekly Commands__**', '```These commands will send something new every week \n alias: k!week```')
        // .addField('weekly meme', '- This command will respond with a new meme of the week every week',true)



        message.author.send(embed2);



        const embed3 = new Discord.MessageEmbed();
        embed3
            .setColor(0x36cbf5)


            .addField('**[🌠] __Staff Commnads__**', '```These commands is to be used by staff of a server```')
            .addField('warn', '- Warns a member with a reason  ', true)
            .addField('kick', '- Kicks a mebmer with a reason ', true)
            .addField('ban', '- Bans a members with a reason  ', true)
            .addField('modlogs', '- Grabs the logs of a user  \n**alias: k!modlog**', true)
            .addField('purge', '- Mass deletes a select number of msgs  \n**aliases: k!prune, k!delete**', true)
            .addField('toggle', '- Toggle\'s Modules within the bot.\n**alias: k!tg**', true)


            .addField('\u200b', '\u200b')


            .addField('**[👑] __XP Commnads__**', '```These commands is to be used by staff of a server```')
            .addField('xp', '- Shows how much xp a user has\n**alias: k!exp**', true)
            .addField('leaderboard', '- shows the current leaderboard of the server\n**alias: k!lb and k!top**.\n **example: k  !leaderboard 10**', true)



            .setFooter('Use the Prefix `k!` at the start of the command to use the command eg "k!ping"')



            message.author.send(embed3);












        message.reply("Check Dms, make sure they're enabled so i can send you them!");

    }
}