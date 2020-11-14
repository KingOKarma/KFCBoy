const Toggle = require("../../models/toggle");
const Shops = require("../../models/shop");
const { MessageEmbed } = require("discord.js");
const { logErr } = require("../../utils/smartUtils");

module.exports = {
  name: "item",
  aliases: [],
  run: (_, message, args) => {
    //if (!message.member.permissionsIn(message.channel).has("ADMINISTRATOR")) return message.channel.send("You need the permission __**\"ADMINISTRATOR\"**__ toLowerCase() use this command")
    Toggle.findOne(
      {
        ServerID: message.guild.id,
        Command: "Currency",
      },
      (err, toggle) => {
        if (err) console.log(err);
        if (!toggle) {
          if (!args.length)
            return message.channel.send(
              "Incorrect usage! \n **k!item <Command> (arguments)**\n You can use `k!item help` to see all commands"
            );
          Shops.findOne(
            {
              ServerID: message.guild.id,
            },
            (err, shop) => {
              if (err) return logErr(message, err);
              if (!shop) {
                message.channel.send(
                  "Well this is awkward <a:kaineflushedeyes:708477282079211570>.\n I dont have setup a shop for you yet. Im getting right on it. Try again in a couple of seconds. \n If this keeps happening please notify us by dming me dev."
                );
                const newShop = new Shops({
                  ServerID: message.guild.id,
                });
                newShop.save().catch((err) => console.log(err));
                return console.log("created shop for" + message.guild.name);
              }
              switch (args[0].toLowerCase()) {
                case "add":
                  if (shop.items.length - 3 >= 5) {
                    message.channel.send(
                      "sorry but this server has waayyy to many items now"
                    );
                    return message.channel.send(
                      "you can get premium by donating to us. wich will allow you to add premium to a server. find out more with `k!premium`"
                    );
                  }
                  if (!args[2]) {
                    message.channel.send(
                      'This command requires at least 2 arguments a name and a price\n **k!item add "<Name>", <Price>'
                    );
                  } else {
                    const name = args[1].toLowerCase();
                    const price = Number(args[2]);
                    if (isNaN(price))
                      return message.channel.send(
                        "item prices can only be Numbers"
                      );

                    if (
                      !shop.items.some(
                        (item) => item.name.toLowerCase == name.toLowerCase
                      )
                    )
                      return message.channel.send(
                        "You cant have two of the same item"
                      );

                    var newItem = {
                      name: name,
                      price: price,
                      default: false,
                    };

                    shop.items.push(newItem);
                    shop.save().catch((err) => console.log(err));
                    message.channel.send(`Item created succesfully`);
                  }
                  break;

                case "remove" && "rm":
                  var itemID = Number(args[1]);
                  if (isNaN(itemID)) {
                    message.channel.send(
                      "You must use the items id use k!shop to see its id"
                    );
                  } else if (itemID > shop.items.length) {
                    message.channel.send(
                      "There is no item with this id <:KaineKek:707398696341340191>"
                    );
                  } else {
                    if (shop.items[itemID - 1].default == true) {
                      message.channel.send(
                        "Sorry but you cant remove the default items <:KaineKek:707398696341340191>"
                      );
                    } else {
                      if (itemID == shop.items.length) {
                        shop.items.pop();
                      } else {
                        shop.items.splice(itemID - 1, 1);
                      }
                      message.channel.send("item removed");
                      shop.save().catch((err) => console.log(err));
                    }
                  }

                  break;

                case "help":
                  var embed = new MessageEmbed()
                    .setTitle("Item commands")
                    .addFields(
                      {
                        name: "add",
                        value:
                          "This will add a item. for now doesnt support spaces",
                        inline: false,
                      },
                      {
                        name: "remove or rm",
                        value:
                          "This will remove a item must use the items id bc of spaces. Start items CANT be removed",
                        inline: false,
                      },
                      {
                        name: "help",
                        value: "Send's this embed",
                      }
                    );
                  message.channel.send(embed);
                  break;

                default:
                  message.channel.send(
                    "Invalid action. if youre confused you can try `k!item help`"
                  );
                  break;
              }
            }
          );
        } else {
          message.channel.send(
            'This server has the "Currency" module disabled'
          );
        }
      }
    );
  },
};
