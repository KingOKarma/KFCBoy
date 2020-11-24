const Toggle = require("../../models/toggle");
const devs = ["406211463125008386", "355993074117115914"];

    module.exports = {
      name: "guildcreate",
      aliases: ["create"],
      run: (bot, message, args) => {

        if (!devs.some((dev) => dev == message.author.id)) {
          message.reply(
            "Sorry This command can only be used by Kaine >:( this is just so you guys dont break anything!"
          );
          return;
        }


        Toggle.findOne(
          {
            ServerID: message.guild.id,
            Command: "Dev",
          },
          (err, toggle) => {
            if (err) console.log(err);
            if (!toggle) {

              console.log(bot)

            //   const member = message.guild.members.cache.get(message.author.id)

              bot.emit("guildCreate", message.guild)
              message.channel.send("emitted")




            } else {
              message.channel.send(
                'This server has the "Dev" module disabled'
              );
            }
          }
        );
      },
    };