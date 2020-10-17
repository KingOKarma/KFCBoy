const Toggle = require("../../models/toggle");
const Discord = require("discord.js")

const Logs = require("../../models/log")

    module.exports = {
      name: "removelogs",
      aliases: ["rmlogs", "rlogs"],
      run: (_, message, args, prefix, MongoToggle, theUser) => {
        Toggle.findOne(
          {
            ServerID: message.guild.id,
            Command: "Staff",
          },
          (err, toggle) => {
            if (err) console.log(err);
            if (!toggle) {
              if(!theUser) return message.channel.send("This guy is not in the server")
              Logs.findOneAndRemove(
                {
                  ServerID: message.guild.id,
                  TheUser: theUser.user.id
                }, (err, user) => {
                  if(err) console.log(err)
                  if(!user) {
                    message.channel.send("Hey you that person doesnt have any logs! wowie what a super star! <:KaineCute:735541745433182288>")
                  } else {
                    message.channel.send(`all cases for **${theUser.user.username}** has been removed` )
                  }
                }
              )
            } else {
              message.channel.send(
                'This server has the "Staff" module disabled'
              );
            }
          }
        );
      },
    };