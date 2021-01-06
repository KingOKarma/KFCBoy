const guilds = require("../../models/guilds");

module.exports = {
  name: "fixwebdb",
  run: (bot, message, args) => {
    if (!message.member.permissionsIn(message.channel).has("MANAGE_GUILD"))
      return message.channel.send(
        'You need the permission __**"Mange Server"**__ to use this command'
      );
    guilds.create({
        ID: message.guild.id,
        Name: message.guild.name,
        Icon: message.guild.id, Name: message.guild.name, Icon: message.guild.icon == null ? "https://cdn.discordapp.com/icons/615804275313868805/c275b4953bd6fe0e5fe9e95017e940f0.webp" :"https://cdn.discordapp.com/icons/" + message.guild.id + "/" + message.guild.icon,
      }).catch(err => message.channel.send(`this guild is already in the database. if you can't find the guild, try this link: http://localhost:3000/leaderboards/guild/${message.guild.id}`));
  },
};
