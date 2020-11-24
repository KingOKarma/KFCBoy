const Discord = require("discord.js"); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require("../config.json");
const message = require("./message");

module.exports = {
  name: "guildMemberRemove",
  run: async (bot, member) => {
    if (member.guild.id != "605859550343462912") return;

    const embed = new Discord.MessageEmbed() // Create a new RichEmbed
      .setColor("RED")
      .setTimestamp()
      .setFooter(`ID: ${message.id}`)
      .setAuthor(
        member.user.tag,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Member Left! ):`)
      .setDescription(`Ping: ${member}`);

    member.guild.channels.cache
      .find((channel) => channel.id === "660595725134069760")
      .send({
        embed,
      });

    if (member.guild.channels.cache.find(channel => channel.name === `verify-${member.user.id}`)) {
      member.guild.channels.cache.find(channel => channel.name === `verify-${member.user.id}`)
        .then((channel) => {
          channel.delete()
        })
        .catch((err) => {
          console.log(err)
        })
    }



  },
};
