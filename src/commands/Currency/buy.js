const currency = require("../../models/currency");
const shop = require("../../models/shop");
var shops = require("../../models/shop");
var toggle = require("../../models/toggle");

module.exports = {
  name: "buy",
  run: (_, message, args) => {
    toggle.findOne(
      {
        ServerID: message.guild.id,
        Command: "Currency",
      },
      (err, toggle) => {
        if (err) return console.log(err);
        if (!toggle) {
          if (!args) {
            message.channel.send(
              "Please tell me the id of the item you want to buy"
            );
          } else if (Number(args[0] == NaN)) {
            message.channel.send(
              "Thats not a id. An id is a number you can find the number with `k!shop`"
            );
          } else {
            currency.findOne(
              { ServerID: message.guild.id, UserID: message.author.id },
              (err, user) => {
                if (err) return console.log(err);
                if (!user) {
                  message.channel.send(
                    "Seems like you haven't started working yet. Use `k!work` to start working"
                  );
                } else {
                  shops.findOne({ ServerID: message.guild.id }, (err, shop) => {
                    if (!shop)
                      return message.channel.send(
                        "Please run the `k!shop` command once."
                      );
                    const item = shop.items[Number(args[0] - 1)];
                    // checks if the item exists and if this exists check if the user has enough Nuggies
                    if (item == undefined) {
                      message.channel.send(
                        "Sorry but thats not a valid item id"
                      );
                    } else if (item.price >= user.Nuggies) {
                      message.channel.send(
                        `Sorry you dont have enough Nuggies. This item costs ${item.price}`
                      );
                    } else {
                      // check if user has the item already
                      if (user.Inventory.has(item.name)) {
                        //gets the users current itemcount in map
                        var itemcount = Number(user.Inventory.get(item.name));
                        user.Inventory.set(item.name, itemcount + 1);
                        user.save().catch((err) => console.log(err));
                        message.channel.send(
                          `You just bought 1 ${item.name}. you now have ${
                            itemcount + 1
                          }`
                        );
                      } else {
                        // just adds the item to the map
                        user.Inventory.set(item.name, 1);
                        user.save().catch((err) => console.log(err));
                        message.channel.send(
                          `Congrats on becomming the proud owner of a ${item.name}`
                        );
                      }
                    }
                  });
                }
              }
            );
          }
        } else {
          message.channel.send(
            'This server has the "Currency" module disabled'
          );
        }
      }
    );
  },
};
