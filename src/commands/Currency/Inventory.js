const { MessageEmbed } = require("discord.js");
const currency = require("../../models/currency");
const Toggle = require("../../models/toggle");
const { logErr } = require("../../utils/smartUtils");

module.exports = {
  name: "inventory",
  aliases: ["inv"],
  run: (_, message, args) => {
    Toggle.findOne(
      { ServerID: message.guild.id, Command: "Currency" },
      (err, toggle) => {
        if (err) return logErr(err);
        if (!toggle) {
          currency.findOne(
            { ServerID: message.guild.id, UserID: message.author.id },
            (err, user) => {
              if (err) return logErr(message, err);
              if (!user)
                return message.channel.send(
                  "seems like you havent started working yet please do `k!work` atleast once"
                );
              var embed = new MessageEmbed()
                .setAuthor(
                  message.author.tag,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setTitle("Inventory\n Items");

              var embeditems = "";
              var items = [];
              user.Inventory.forEach((value, key, map) => {
                items.push(key);
              });
              while (items.length != 0) {
                embed.addField(items[0], user.Inventory.get(items[0]), false);
                //embeditems += embeditems + `${items[0]} ${user.Inventory.get(items[0])}`;
                items.shift();
              }
              //embed.addField("Items", embeditems, false);
              message.channel.send(embed);
            }
          );
        } else {
          message.channel.send(
            "The Currency module for this server is disabled"
          );
        }
      }
    );
  },
};
