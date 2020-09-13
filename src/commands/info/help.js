const Discord = require("discord.js")
module.exports = {
    name: 'help',
    aliases: ["h"],
    run: (_, message, args) => {
        message.delete();
        const embed = new Discord.MessageEmbed()
        .setTitle('**Commands Available for KFC Bucket Boi**')
        .setColor(0x36cbf5)
        .addField('__Current Server__', message.guild.name)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setAuthor('Creator: King Of Karma#0069', 'https://karmakingdom.weebly.com/uploads/1/3/1/7/131732357/published/pfp.png?1587066957')
        .setDescription(`**Home Server:** https://discord.gg/nQRC3SRUse \n **Invite at:** https://invite.bucketbot.dev  \n the Prefix \`k!\` at the start of the command to use the command eg "k!ping"`,)
        .addField('**[📚] __Info Commands__**', '```These commands give you some info```')
        .addField('help', '- Brings up this menu in your DMs \n**aliases: k!h**',true)
        .addField('info', '- Will display a small amount of info about the server you are in and the bot \n**aliases: k!botinfo, k!bot**',true)
        .addField('invite', '- The bot will respond with a link to where you can add the bot to your server \n**aliases: k!iv, k!ivt, k!invt**',true)
        .addField('support', '- Responds with a link to my main/support server',true)
        .addField('membercount ', '- Displays the amount of members/humans/bots in the server \n**aliases: k!members, k!countmembers**',true)
        .addField('servers ', '- Displays how many servers i am in \n**aliases: k!guilds**',true)
        .addField('vote', '- Gives the user a link to vote for the bot on https://top.gg/bot/614110037291565056 \n**aliases: k!upvote, k!discord**')
        .addField('\u200b', '\u200b')

        .addField('**[🔨] __Utility Commands__**', '```These commands are used to be useful in certain situaions```')
        .addField('whois', "- Displays a user's userinfo, roles, perms, etc \n**aliases k!userinfo, k!whois**", true)
        .addField('ping', "- Will respond with bot's latency and API latency", true)
        .addField('avatar ', "- Displays a user's display avatar (pfp) \n**aliases: k!av**", true)
        .addField('say', "- Responds with whatever the next arguments are \n**aliases: k!s**", true)
        .addField('embed ', "- Same as `k!say` but it sends the message as an embed \n**aliases: k!eb**", true)
        .addField('\u200b', '\u200b')
        
        .setFooter('Use the Prefix `k!` at the start of the command to use the command eg "k!ping"')
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
        embed2
        .setColor(0x36cbf5)
        .addField('**[🎉] __Fun Commands__**', '```These commands are here for your entertainment```')
        .addField('shuffle ', "- Plays the guessing game where you choose 1, 2 or 3\n**aliases: k!shufflehat, k!sh**", true)
        .addField('mc ', "-  Displays the information on the offical Karma Kraft Minecraft server!\n**aliases: k!server**", true)
        .addField('cool ', "- Learn how to be cool! 😎", true)
        .addField('kids ', "- Displays how many kids the second argument will have (e.g. k!kids Kaine) \n**aliases: k!kid, k!children**", true)
        .addField('kk ', "- Thats racist", true)
        .addField('8ball', "- Get your fortune \n**aliases: k!eightball k!fortune**", true)
        .addField('dadjoke', "- Yes this is a command with over 30 responses \n**aliases: k!dad**", true)  
        .addField('comment', "- Works just like `say` and `emebed` I will say your message as a youtube comment with random likes and replies \n alias: k!cm")
        .addField('\u200b', '\u200b')



        .addField('**[📷] __Image Commands__**', '```These are the commands that display images```')
        .addField('emote', '- If you send an emote I will send that emote as an image (only if im in the server where the emote is) \n **aliases: k!emotes, k!emoji**')
        .addField('image', '- It will send whatever you ask it to send (e.g k!image pillows) \n**aliases: k!pic, k!picture**',true)
        .addField('karma', "- Will respond with either a media file from **King of Karma's** personal folder \n**aliases: k!kaine**",true)
        .addField('meme', "- Will respond with a meme from a few select subreddits \n**aliases: k!memes**",true)
        .addField('\u200b', '\u200b')
        .addField('**[👇] __Interaction Commands__**', '```These comamnds used for interacting with other users```')
        .addField('hug', 'ping a user after typing `hug` to hug them',true)
        .addField('kiss', 'ping a user after typing `kiss` to kiss them',true)
        .addField('bucket', 'ping a user after typing `bucket` to give them a wonderful hat! \n**aliases: k!hat**',true)
        .addField('rep', 'Allows you to add rep to any user \n**aliases: k!addrep, k!plusrep**',true)
        .addField('viewrep', 'Allows you to see how much rep a user has \n**alias: k!repview**',true)
        .addField('\u200b', '\u200b')

        // .addField('**[⏳] __Weekly Commands__**', '```These commands will send something new every week \n alias: k!week```')
        // .addField('weekly meme', '- This command will respond with a new meme of the week every week',true)



        message.author.send(embed2)
        const embed3 = new Discord.MessageEmbed()
        embed3
        .setColor(0x36cbf5)


        .addField('**[🌠] __Staff Commnads__**', '```These commands is to be used by staff of a server```')
        .addField('purge', '- Mass deletes a select number of msgs  \n**aliases: k!prune, k!delete**',true)
        .addField('toggle', '- Toggle\'s Modules within the bot.\n**aliase: k!tg**',true)


        .setFooter('Use the Prefix `k!` at the start of the command to use the command eg "k!ping"')
        message.reply("Check Dms");
        message.author.send(embed3);

    }
}