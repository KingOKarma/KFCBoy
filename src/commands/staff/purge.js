const Toggle = require("../../models/toggle.js");

module.exports = {
    name: 'purge',
    aliases: ["prune", "delete"],

    run: async (_, message, args) => {
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Staff"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    if (!message.member.permissionsIn(message.channel).has("MANAGE_MESSAGES")) return message.channel.send("You need the permission __**\"Mange Messages\"**__ to use this command")
                    if (!message.guild.me.permissionsIn(message.channel).has("MANAGE_MESSAGES")) return message.channel.send("I need the permission __**\"Mange Messages\"**__ to use this command")

                    const deleteCount = parseInt(args[0], 10);
                    console.log(args[0])

                    if (!deleteCount || deleteCount < 1 || deleteCount > 100)
                        return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");

                    message.delete()
                    setTimeout(async () => {
                        const fetched = await message.channel.messages.fetch({ limit: deleteCount });
                        message.channel.bulkDelete(fetched)
                            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
                    }, 100);
                }
                if (toggle) return message.channel.send("This server has the \"Staff\" module disabled")
            })

    }
}





