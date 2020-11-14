const Toggle = require("../../models/toggle");

    module.exports = {
      name: "guildcreate",
      aliases: [],
      run: (client, message, args) => {
        Toggle.findOne(
          {
            ServerID: message.guild.id,
            Command: "Dev",
          },
          (err, toggle) => {
            if (err) console.log(err);
            if (!toggle) {
              client.emit("guildCreate", message.guild)
            } else {
              message.channel.send(
                'This server has the "Dev" module disabled'
              );
            }
          }
        );
      },
    };