const guilds = require("../models/guilds")

module.exports = {
    name: "guildUpdate",
    run: (bot, oldGuild, newGuild) => {
        guilds.findOne({ID: newGuild.id}, (err, guild) => {
            if(err) return console.log(err);
            if(!guild){
                return guilds.create({ID: newGuild.id, Name: newGuild.name, Icon: newGuild.icon == null ? "https://cdn.discordapp.com/icons/615804275313868805/c275b4953bd6fe0e5fe9e95017e940f0.webp" :"https://cdn.discordapp.com/icons/" + newGuild.id + "/" + newGuild.icon})
            } else {
                guild.Icon = newGuild.icon;
                guild.Name = newGuild.icon == null ? "https://cdn.discordapp.com/icons/615804275313868805/c275b4953bd6fe0e5fe9e95017e940f0.webp" : "https://cdn.discordapp.com/icons/" + newGuild.id + "/" + newGuild.icon;
                guild.save().catch(err => console.log(err))
            }
        })
    }
}