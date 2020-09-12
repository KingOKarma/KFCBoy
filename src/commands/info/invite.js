module.exports = {
    name: 'invite',
    aliases: ["iv", "ivt", "invt"],

    run: (_, message) => {
        
        message.channel.send(`**${message.author} add me to your server at**\n> <https://invite.bucketbot.dev>`)
    }
}