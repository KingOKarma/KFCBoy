

module.exports = {
    name: 'status',
    aliases: ["gitstatus"],

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




        exec("git status", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                process.chdir('./src');
                message.channel.send("I cant get the status for the repo for some reason <:RoScreaming:719628209402019980>\n That reason being ```" + error + "```\nSo i moved back into ```" + process.cwd() + "```\nCheck the termianl?") 
                
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            message.channel.send(`Git pull request: \n\`\`\`js\n${stdout}\`\`\``)
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