
const Discord = require('discord.js'); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require('../config.json');
const message = require('./message');




module.exports = async (bot, channel) => {  

    const embed = new Discord.MessageEmbed() // Create a new RichEmbed
    .setColor('GREEN')
    .setTimestamp()
    .setFooter(`ID: ${message.id}`)
    .setAuthor(channel.name)
    .setTitle(`Channel Created!`)
    .setDescription(`Ping: ${channel}`);

  channel.guild.channels.cache.find(channel => channel.id === '660595725134069760').send({ 
    embed
  });




}
