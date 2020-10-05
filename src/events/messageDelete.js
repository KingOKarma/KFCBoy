const Discord = require('discord.js'); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();

module.exports = (bot, message) => {
    const embed = new Discord.MessageEmbed() // Create a new RichEmbed
    .setColor('RED')
    .setTimestamp()
    .setFooter(`ID: ${message.id}`)
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setTitle(`Message deleted in #${message.channel.name}`)
    .setDescription(message.cleanContent);

  message.guild.channels.cache.find(channel => channel.id === '755452483941302322').send({ 
    embed
  });

};

