const Discord = require("discord.js"); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require("../config.json");
const Shop = require("../models/shop");

module.exports = {
  name: "guildCreate",
  run: (bot, guild) => {
    const newShop = new Shop({
      ServerID: guild.id,
    });
    newShop.save().catch((err) => console.log(err));
    console.log("created shop for" + guild.name);

    const karmakingdomjoin = guild.client.guilds.cache.find(
      (guild) => guild.id === "605859550343462912"
    );

    const channeljoin = karmakingdomjoin.channels.cache.find(
      (channel) => channel.id === "700438892888719501"
    );

    const owner = guild.members.cache.get(guild.ownerID)
    const embed = new Discord.MessageEmbed()
      .setAuthor("KFC Bucket Boi", guild.client.user.displayAvatarURL())
      .setColor("0x36cbf5")
      .setDescription(
        `**KFC Bucket Boi has joined **\`${guild.name}\` **with the id of **\`${guild.id}\` \n Server owned by \`${owner.user.tag}\` has \`${guild.memberCount}\` members`
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter(
        `This bot was brought to you by King Of Karma#0069`,
        `https://media.discordapp.net/attachments/697238236896165921/700081276912402512/pfp.png?width=481&height=481`
      );
    channeljoin.send(embed);

    //maybe do this one day
    // var firstchannel = guild.channels.cache.map(channel => channel.name)
    // channeljoin.send(`<${firstchannel.createInvite.url}>`)
  },
};
