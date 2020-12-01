const devs = ["406211463125008386", "355993074117115914"];


module.exports = {
  name: "eval",
  aliases: [],
  run: async (_, message, args) => {
   if (!devs.some((dev) => dev == message.author.id))
      return message.channel.send(
        "This is a Owner only comamnd! <:Kaineshrug:711591140125704242>"
      );
  
  try {
      var code = args.join(" ")
      code.replace("(process.env.DISCORD_BOT_TOKEN)", "token")
      let evaled = await require("util").inspect(eval(code));
      if(typeof evaled != String) evaled = require("util").inspect(evaled);
      evaled.replace(`${process.env.DISCORD_BOT_TOKEN}`, "TOKEN");
      if(evaled.length > 1024) {
        return message.channel.send("text too long ;)")
      } else {
        message.channel.send({
          embed: {
            title: message.author.username + " evaled",
            fields: [
              { name: `Input`, value: `\`\`\`js\n${args.join(' ')}\`\`\`` },
              { name: `Output`, value: `\`\`\`js\n${evaled}\`\`\`` }
            ]
          }
        })
        console.log(message.author.username + " executed code:" + args.join(' '))
      }
    } catch (err) {
      message.channel.send({
        embed: {
          title: message.author.username + " evaled",
          fields: [
            { name: `Input`, value: `\`\`\`js\n${args.join(' ')}\`\`\`` },
            { name: `Output`, value: `\`\`\`js\n${err}\`\`\`` }
          ]
        }
      })
    }
  }
}
