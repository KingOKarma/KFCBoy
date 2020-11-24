const prefix = require("../../models/prefix");
const { logErr } = require("../../utils/smartUtils");

module.exports = {
    name: "prefix",
    run: (bot, message, args) => {
        if (!message.member.permissionsIn(message.channel).has("MANAGE_GUILD")) return message.channel.send("You need the permission __**\"Mange Server\"**__ to use this command")
        if(!args[0]) return message.channel.send("You need to tell me the new prefix dummy. `k!prefix <prefix>`");
        
        prefix.findOne({ServerID: message.guild.id}, (err, guild) => {
            if(err) return logErr(err);
            if(!guild) {
                var newGuild = new prefix({
                    ServerID: message.guild.id,
                    Prefix: args[0].toLowerCase(),
                });
                newGuild.save().catch(err => logErr(message, err))
            } else {
                guild.Prefix = args[0].toLowerCase();
                guild.save().catch(err => logErr(message, err))
            }
            
            bot.prefix.set(message.guild.id, args[0].toLowerCase())
            message.channel.send(`The prefix for this server is now \`${bot.prefix.get(message.guild.id)}\``);
        })
    }
}