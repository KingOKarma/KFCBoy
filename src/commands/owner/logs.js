const Discord = require("discord.js")
module.exports = {
    name: 'pm2',
    aliases: ["pm2logs"],
    run: async (_, message, args, bot, token, client) => {

        if (message.author.id != "406211463125008386") {
            message.reply("Sorry This command can only be used by Kaine >:( this is just so you guys dont break anything!")
            return
        }


        const { exec } = require("child_process");
        



        exec(`pm2 logs 12 --nostream`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                message.channel.send("I cant check pm2 logs <a:VillagerCursedStare:719904898954821712>\n That reason being ```" + error + "```")
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                message.channel.send(`pm2 logs request: \n\`\`\`js\n${stderr}\`\`\``)

                return;
            }
            console.log(`stdout: ${stdout}`);
            message.channel.send(`pm2 logs request: \n\`\`\`js\n${stdout}\`\`\``)

        })


        message.channel.send("logfile:", { files: [
            "/home/karma/.pm2/logs/KFCBoy-out.log",
            "/home/karma/.pm2/logs/KFCboy-error.log"
        ] });





    }



}
