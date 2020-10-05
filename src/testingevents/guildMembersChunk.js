
const Discord = require('discord.js'); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require('../config.json');
const message = require('../events/message');




module.exports = async (bot, members, guild) => {  



    const embed = new Discord.MessageEmbed() // Create a new RichEmbed
    .setColor('0xFFD700')
    .setTimestamp()
    .setFooter(`ID: ${message.id}`)
    .setTitle(`Wow A chunk of members just joined!`)
    .addField("Guild they joined from:", guild.name)
    .addField("Member's names:", members);

    // const theBot = members.client.get("614110037291565056")
    console.log(members.cache.find(user => user.id === "614110037291565056"))
    const Server = theBot.user.guilds.cache.find(guild => guild.id === "605859550343462912")
    const theChannel = Server.channels.cache.find(channel => channel.id === "660595725134069760")

    theChannel.send(embed);






}