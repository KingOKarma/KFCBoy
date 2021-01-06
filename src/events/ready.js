const Discord = require("discord.js"); // To install Discord, execute npm install discord.js
const bot = new Discord.Client();
const config = require("../config.json");
const guilds = require("../models/guilds");

module.exports = {
  name: "ready",
  run: (bot) => {
    const setCollections = require("../utils/collections");
    setCollections(bot);
    const commandHandler = require("../handlers/command");
    commandHandler(bot);

    console.log(
      `I has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`
    );

    bot.user.setActivity(
      `DM ME "dev" TO SEND FEEDBACK, Also I'm inside ${bot.guilds.cache.size} servers and serveing ${bot.users.cache.size} users,`
    );

    bot.user.setPresence({
      activity: {
        name: `Prefix = "k!" || DM ME "dev" TO SEND FEEDBACK, Also I'm inside ${bot.guilds.cache.size} servers and serveing ${bot.users.cache.size} users,`,
        url: "https://www.twitch.tv/King_O_Karma",
        type: "WATCHING",
      },
    });

    console.log("attempting join....");
    bot.emit("messageReactionAdd", "🏓");

    setInterval(() => {
      console.log("checking chache for missing guilds");
      bot.guilds.cache.forEach((guild) => {
        guilds
          .create({
            ID: guild.id,
            Name: guild.name,
            Icon: guild.icon,
          })
          .catch((err) => {});
      });
    }, 30 * 60 * 1000);
  },
};
