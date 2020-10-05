const { Collection } = require('discord.js')

module.exports = bot => {
    bot.commands = new Collection();
    bot.aliases = new Collection();
    // bot.events = new Collection();

}