const Toggle = require("../../models/toggle");
const Shops = require("../../models/shop");
const Discord = require("discord.js")



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
          Shops.findOne({ServerID: message.guild.id}, (err, shop) => {
            if(err) return console.log(err);
            if(!shop) {
              message.channel.send("well this is awkward <a:kaineflushedeyes:708477282079211570>.\n i dont have setup a shop for you yet. im getting right on it. try again in a couple of seconds. \n if this keeps happening please notify us by dming me dev.")
            const newShop = new Shops({
              ServerID: message.guild.id,
            })
            newShop.save().catch(err => console.log(err))
            console.log("created shop for" + message.guild.name)

            } else {
              let guildicon = message.guild.iconURL({ dynamic: true })
              var ID = 1;
              if (!message.guild.iconURL({ dynamic: true })) {
                  guildicon = "https://cdn.discordapp.com/attachments/643347490925445132/758369629155360818/2Q.png"
              }
              var embed = new Discord.MessageEmbed()
              .setTitle(`**${message.guild.name}'s** shop`)
              .setThumbnail(guildicon)
              .addField("Item", "Price\nID")
              .setFooter("item ids may change as items gets removed and added")
            }
            shop.items.forEach(item => {
              embed.addField(item.name, item.price + "<:chickennuggie:706268265424355399>\nID:" + ID)
            ID++});
            message.channel.send(embed)
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