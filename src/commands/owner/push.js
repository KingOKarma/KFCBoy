

module.exports = {
    name: 'push',
    aliases: ["gitpush"],

    run: (_, message, args) => {

        if (message.author.id != "406211463125008386") {
            message.reply("Sorry This command can only be used by Kaine >:( this is just so you guys dont break anything!")
            return
        }


        const { exec } = require("child_process");
        

        console.log('Starting directory: ' + process.cwd());
        try {
            process.chdir('../');
            console.log('New directory: ' + process.cwd());
          }
          catch (err) {
            console.log('chdir: ' + err);
            return
          }




        exec("git push", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                process.chdir('./src');
                message.channel.send("I cant push to the repo for some reason <:RoScreaming:719628209402019980>\n That reason being ```" + error + "```\nSo i moved back into ```" + process.cwd() + "```\nuse `rbstatus` To check for files!")
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                message.channel.send(`Git push request: \n\`\`\`${stderr}\`\`\``)
                message.channel.send(`\`\`\`Current directory: ${process.cwd()}\`\`\``);
                return;
            }
            console.log(`stdout: ${stdout}`);
            message.channel.send(`Git push request: \n\`\`\`${stdout}\`\`\``)
            message.channel.send(`\`\`\`Current directory: ${process.cwd()}\`\`\``);

        })


        console.log('Final directory: ' + process.cwd());
        try {
            process.chdir('./src');
            console.log('New directory: ' + process.cwd());
          }
          catch (err) {
            console.log('chdir: ' + err);
            return
          }




    }
}