const Toggle = require("../../models/toggle");
const Discord = require("discord.js");
const { collection } = require("../../models/toggle");
const Canvas = require("canvas");

module.exports = {
  name: "tictactoe",
  aliases: [],
  run: async (_, message, args, prefix, mgToggle, theUser) => {
    Toggle.findOne(
      {
        ServerID: message.guild.id,
        Command: "Games",
      },
      async (err, toggle) => {
        if (err) console.log(err);
        if (!toggle) {
          if (!theUser) {
            message.channel.send("Can't find the user you want to challenge");
          } else {
            var newMessage = "";
            const filter = (reaction, user) => {
              return (
                reaction.emoji.name === "✅" && user.id === theUser.user.id
              );
            };
            const embed = new Discord.MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setTitle(`${theUser.user.tag} do you accept this challenge?`);
            const Message = await message.channel.send(embed);
            Message.react("✅");
            Message.react("❌");
            Message.awaitReactions(filter, {
              max: 1,
              time: 30000,
              errors: ["time"],
            })
              .then((collected) => {
                var table = [["", "", ""], ["", "", ""][("", "", "")]];
                const playerMap = new Map();
                playerMap.set(message.author.id, "O");
                playerMap.set(theUser.user.tag, "X");
                startGame(message, playerMap, table, theUser);
              })
              .catch((collected) => {
                message.reply(
                  `seems like ${theUser.user.tag} doesnt want to play a game of tic tac toe`
                );
              });
          }
        } else {
          message.channel.send('This server has the "Games" module disabled');
        }
      }
    );
  },
};

function startGame(message, players, table, user) {
  if (players.has(message.author.id) === "X") {
    message.channel.send(
      `${message.author}, ${
        user.user.tag
      } wants to play a game of tic tac toe.\nyou are "${players.get(
        message.author.id
      )} and you start"`
    );
  } else {
    message.channel.send(
      `${message.author}, ${
        user.user.tag
      } wants to play a game of tic tac toe.\nyou are "${players.get(
        message.author.id
      )}" and ${user.user.tag} starts`
    );
  }
  console.log("game started");

  game(message, players, table, user);
}

async function game(message, players, table, user) {
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "GameTable.jpg"
  );
  const embed = new Discord.MessageEmbed().setImage(attachment);
  const MESSAGE = await message.channel.send(embed);
  var nextPlayer = message.author.id;
  if (message.author.id == lastPlayer) {
    console.log(true);
  } else {
    console.log(false);
  }
  const filter = (m) =>
    m.content.includes("places") && m.author.id == nextPlayer;
  const collector = message.channel.createMessageCollector(filter, {
    time: 30000,
  });
  var winner = null;

  try {
    collector.on("collect", (m) => {
      const args = m.content.slice(2).trim().split(/ +/g);

      if (args) {
        var x = Number(args[0]) - 1;
        var y = Number(args[1]) - 1;
        if (x <= 4 || y <= 4 || x >= 0 || y >= 0 || y == NaN || x == NaN) {
          table[y][x] = players.get(m.author.id);
          console.log(table);

          //check if theres a winner
          for (let i = 0; i < 3; i++) {
            if (equals3(table[i][0], table[i][1], table[i][2])) {
              return (winner = m.author.tag);
            }
          }
          for (let i = 0; i < 3; i++) {
            if (equals3(table[0][i], table[1][i], table[0][i])) {
              return (winner = m.author.tag);
            }
          }
          if (equals3(table[0][0], table[1][1], table[2][2])) {
            winner = m.author.tag;
          }
          if (equals3(table[2][0], table[1][1], table[0][2])) {
            winner = m.author.tag;
          }

          // if theres no user set next user
          if (winner == null) {
            if (m.author.id == user.user.id) {
              nextPlayer = message.author.id;
            } else {
              nextPlayer = user.user.id;
            }
          } else {
            ctx.lineWidth(32);
            ctx.moveTo(50, 50);
            const image = Discord.MessageAttachment(canvas.toBuffer(), "gameTable");
            embed.setImage(image);
            MESSAGE.edit(embed);
          }
        } else {
          m.channel.send(
            "Wrong arguments please provide me with cordinates between 1 and 3 :)))"
          );
        }
      }
    });
  } catch (err) {
    message.channel.send(
      "sorry but an error happened. if this keeps happening please contact a developer"
    );
    console.log(err);
  }

  collector.on("end", (collected) => {
    message.channel.send(`game ended you two where too slow`);
  });
}

// sort function
function equals3(a, b, c) {
  return a == b && b == c && a != "";
}
