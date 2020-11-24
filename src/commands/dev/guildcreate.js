const Toggle = require("../../models/toggle");

    module.exports = {
      name: "guilduseradd",
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
              client.emit("guildMemberAdd", message)
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