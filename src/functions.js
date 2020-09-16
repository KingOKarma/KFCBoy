
module.exports = {

    UserMention: function (message, args, choice) {


        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
             theUser = message.guild.member(user);

            // If the member is in the guild
            if (!theUser) {
                console.log("Mention Check")
                message.reply("That user isn't in this guild!");
            }
        } else {
            console.log(args.join(' '))

            if (args[0].match(/\d{18}/)) {
                console.log("ID Check")
                 theUser = message.guild.members.cache.find(member => member.id === args[0])
                if (theUser === undefined) {
                    message.reply("Please Mention a user who is in the **server** by their ID, Mention or Display name!")
                    return
                }

            }
        }
        message.channel.send(`**${theUser.user.tag}** Has been ${choice}!`)

        console.log(theUser.user.username)

    }

}



