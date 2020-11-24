const Discord = require("discord.js"); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
<<<<<<< HEAD
const config = require("../config.json");
const message = require("./message");

module.exports = {
  name: "channelDelete",
  run: async (bot, channel) => {
    if (!channel.type === "channel") return;

    if (channel.guild.id != config.MainServerID) return;

    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
      .setAuthor(channel.name)
      .setTitle(`Channel Deleted!`);

    channel.guild.channels.cache
      .find((channel) => channel.id === "660595725134069760")
      .send({
        embed,
      });
  },
};
=======
const config = require('../config.json');
const message = require('./message');




module.exports = async (bot, channel) => {  

  if (channel.type != "channel") return

  if (channel.guild.id != config.MainServerID) return

    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setTimestamp()
    .setFooter(`ID: ${channel.id}`)
    .setAuthor(channel.name)
    .setTitle(`Channel Deleted!`);

  channel.guild.channels.cache.find(channel => channel.id === '660595725134069760').send({ 
    embed
  });




}
>>>>>>> 500b6853b599f7f599c259e01078fb41d7ef77cf
