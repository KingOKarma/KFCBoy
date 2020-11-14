const Toggle = require("../../models/toggle");
const shops = require("../../models/shop");
const Discord = require("discord.js");

module.exports = {
  name: "shop",
  aliases: [],
  run: (_, message, args) => {
    Toggle.findOne(
      {
        ServerID: message.guild.id,
        Command: "Currency",
      },
      (err, toggle) => {
        if (err) console.log(err);
        if (!toggle) {
          shops.findOne({ ServerID: message.guild.id }, (err, shop) => {
            if (!shop) {
              const newShop = new shops({
                ServerID: message.guild.id,
              });
              newShop.save().catch((err) => console.log(err));
              message.channel.send("The shop for this server has just been created");
            } else {
              var embed = new Discord.MessageEmbed();
              var id = 0;
              shop.items.forEach((item) => {
                id++;
                embed.addField(
                  item.name,
                  `cost: ${item.price} <:chickennuggie:706268265424355399>\nId: ${id}`
                );
              });
              message.channel.send(embed);
            }
          });
        } else {
          message.channel.send(
            'This server has the "Currency" module disabled'
          );
        }
      }
    );
  },
};
