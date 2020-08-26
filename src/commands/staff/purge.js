module.exports = {
    name: 'purge',
    aliases: ["prune", "delete"],


    run: async (_, message, prefix, args) => {


        message.reply("Sorry this command is still under constuction")

        // const argss = message.content.split(' ').slice(1);
        // const amount = argss.join(' ');


        // async function purge() {
        //     try {
        //         await message.delete();
        //     } catch (err) { }
        //     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        //         return message.reply("❌ You do not have the **MANAGE MESSAGES** permission. Please contact a staff member")
        //             .then(m => m.delete(20000));
        //     }

        //     // No bot permissions
        //     if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        //         return message.reply("❌ I do not have permissions to delete messages. Please contact a staff member")
        //             .then(m => m.delete(20000));
        //     }


        //     if (isNaN(argss[0])) {
        //         // Sends a message to the channel.
        //         message.channel.send(`Please use a number as your arguments. \n \`Usage ${prefix}purge <amount>\``); //\n means new line.
        //         // Cancels out of the script, so the rest doesn't run.
        //         return;
        //     }

        //     if (!args[1] > 100) return message.reply('You can`t delete more than 100 messages at once!')

        //     if (!args[1] > 1) return message.reply('You have to delete at least 1 message!')


        //     await msg.channel.messages.fetch({ limit: amount }).then(messages => {
        //         msg.channel.bulkDelete(messages

        //         )
        //     });


        // }

        // purge()
    }
}





