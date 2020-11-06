const Toggle = require("../../models/toggle");
const Shops = require("../../models/shop")

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
              if(!args.length) return message.channel.send("Incorrect usage! \n **k!item <Command> (arguments)**\n You can use `k!item help` to see all commands")
              Shops.findOne(
                {
                  ServerID: message.guild.id
                }, (err, shop) => {
                  if(!shop) {
                    message.channel.send("Well this is awkward <a:kaineflushedeyes:708477282079211570>.\n I dont have setup a shop for you yet. Im getting right on it. Try again in a couple of seconds. \n If this keeps happening please notify us by dming me dev.")
                  const newShop = new Shops({
                    ServerID: message.guild.id,
                  })
                  newShop.save().catch(err => console.log(err))
                  console.log("created shop for" + message.guild.name)
      
                  }
                  switch (args[0].toLowerCase()) {
                    case "add":
                      var sets = message.content.slice(",")
                      var addItems = message.content.match(/"([^"]+)"/);
                      addItems.splice(addItems.size - 3, 0)
                      console.log(addItems)
                      return console.log("this message had " + sets + " sets")
                        if(!args[2]) {
                          message.channel.send('This command requires atleast 2 arguments a name and a price\n **k!item add "<Name>", <Price>')
                        } else {
                          const name = args[1].toLowerCase()
                          const price = Number(args[2])
                          if(isNaN(price)) return message.channel.send("item prices can only be Numbers");
                          if(shop.items.some(item => item.name == args[1].toLowerCase)) return message.channel.send("already an item with that name")

                          if(shop.items.some(item => item.name.toLowerCase == name.toLowerCase)) return message.channel.send("You cant have two of the same item")
                          
                          var newItem = {
                            name: name,
                            price: price,
                            default: false
                          }
                          
                          shop.items.push(newItem)
                          shop.save().catch(err => console.log(err))
                          message.channel.send("done :smile:")
                        }
                      break;

                      case "remove" && "rm":
                        var itemID = Number(args[1]);
                        if(isNaN(itemID)) {
                          message.channel.send("You must use the items id use k!shop to see its id")
                        } else if(itemID > shop.items.length) {
                          message.channel.send("There is no item with this id <:KaineKek:707398696341340191>")
                        } else {
                          if(shop.items[itemID - 1].default == true) {
                            message.channel.send("Sorry but you cant remove the default items <:KaineKek:707398696341340191>")
                          } else {
                            if(itemID == shop.items.length) {
                              shop.items.pop()
                            } else {  
                              const sliced = shop.items.splice(itemID -1, 1)
                              console.log(sliced)
                            }
                            console.log(shop.items)
                            message.channel.send("item removed")
                            shop.save().catch(err => console.log(err))
                          }
                        }

                      break;

                      case "help":
                        message
                      break;
                  
                    default:
                      message.channel.send("invalid action")
                      break;
                  }
                })
            } else {
              message.channel.send(
                'This server has the "Currency" module disabled'
              );
            }
          }
        );
      },
    };
