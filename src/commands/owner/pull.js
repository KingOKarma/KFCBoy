const devs = ["406211463125008386", "355993074117115914"];

module.exports = {
    name: 'pull',
    aliases: ["gitpull"],

    run: (_, message, args) => {

         if (!devs.some((dev) => dev == message.author.id))
            return message.channel.send(
                "This is a Owner only comamnd! <:Kaineshrug:711591140125704242>"
            );


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




        exec("git pull", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                process.chdir('./src');
                message.channel.send("I cant pull the repo for some reason <a:VillagerCursedStare:719904898954821712>\n That reason being ```" + error + "```\nSo i moved back into ```" + process.cwd() + "```\nuse `rbstatus` To check for files!")
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                message.channel.send(`Git pull request: \n\`\`\`${stdout}\`\`\``)
                message.channel.send(`\`\`\`Current directory: ${process.cwd()}\`\`\``);
                return;
            }
            console.log(`stdout: ${stdout}`);
            message.channel.send(`Git pull request: \n\`\`\`${stdout}\`\`\``)
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
