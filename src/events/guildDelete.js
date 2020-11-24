const Discord = require("discord.js"); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require("../config.json");

module.exports = {
  name: "guildDelete",
  run: (bot, guild) => {
    const karmakingdomjoin = guild.client.guilds.cache.find(
      (guild) => guild.id === "605859550343462912"
    );

    const channeljoin = karmakingdomjoin.channels.cache.find(
      (channel) => channel.id === "700438892888719501"
    );

    const embed = new Discord.MessageEmbed()
      .setAuthor("KFC Bucket Boi", guild.client.user.displayAvatarURL())
      .setColor("0xFF0000")
      .setDescription(
        `**KFC Bucket Boi has left **\`${guild.name}\` **with the id of **\`${guild.id}\` \n Server owned by \`${guild.owner.user.tag}\` has \`${guild.memberCount}\` members`
      )

      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter(
        `This bot was brought to you by King Of Karma#0069`,
        `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`
      );
    channeljoin.send(embed);
  },
};
