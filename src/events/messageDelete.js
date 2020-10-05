const Discord = require('discord.js'); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();

module.exports = (bot, message) => {

    if (message.guild.id != "605859550343462912") return

    const embed = new Discord.MessageEmbed() // Create a new RichEmbed
    .setColor('RED')
    .setTimestamp()
    .setFooter(`ID: ${message.id}`)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
    .setTitle(`Message deleted`)
    .setDescription(`in ${message.channel}: \n${message.cleanContent}`);

  message.guild.channels.cache.find(channel => channel.id === '660595725134069760').send({ 
    embed
  });

};

