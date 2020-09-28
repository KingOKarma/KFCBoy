const Canvas = require('canvas');
const Discord = require('discord.js');
const words = require('../../blacklist/words/blacklist.json');
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'comment',
    aliases: ["cm"],
    run: async (_, message, args) => {

        if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Fun"
        },
           async (err, toggle,) => {

                if (err) console.log(err);
                if (!toggle) {

                    const blocked = words.words.filter(word => message.content.toLowerCase().includes(word));

                    let numbers = Math.floor(Math.random() * 1000 + 1);
                    let numbers2 = Math.floor(Math.random() * 1000 + 1);





                    const canvas = Canvas.createCanvas(700, 168, "",);
                    const ctx = canvas.getContext('2d');
                    Canvas.registerFont('./fonts/Roboto-Regular.ttf', { family: 'fontFamily' });



                    let backgroundTemp = ["comment-template.png", "comment-template-like.png", "comment-template-dislike.png"]
                    let backTemp = backgroundTemp[Math.floor(Math.random() * backgroundTemp.length)];


                    const background = await Canvas.loadImage(`./images/comment/${backTemp}`);
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                    ctx.strokeStyle = '#74037b';
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);

                    ctx.font = '18px sans-serif'
                    ctx.rotate(0)
                    ctx.fillStyle = '#000000';
                    ctx.fillText(`${message.member.displayName}`, canvas.width / 6.5, canvas.height / 3.7);

                    ctx.font = '15px sans-serif'
                    ctx.rotate(0)
                    ctx.fillStyle = '#000000';
                    if (blocked.length > 0) {
                        ctx.fillText("I said a naughty word, I'm very sorry ):", canvas.width / 6.5, canvas.height / 2.4);
                        console.log(`${message.author.tag} tried to use profanity.`);

                    } else {
                        ctx.fillText(args.join(' '), canvas.width / 6.5, canvas.height / 2.4);
                    }
                    // ctx.font = 'bold 12px sans-serif'
                    // ctx.rotate(0)
                    // ctx.fillStyle = '#A0A0A0';
                    // ctx.fillText(`"number" days ago`, canvas.width/6.5, canvas.height/6 );

                    ctx.font = 'bold 13.5px sans-serif'
                    ctx.rotate(0)
                    ctx.fillStyle = '#A0A0A0';
                    ctx.fillText(`${numbers}`, canvas.width / 5.5, canvas.height / 1.6);

                    ctx.font = '17px sans-serif'
                    ctx.rotate(0)
                    ctx.fillStyle = '#2869d6';
                    ctx.fillText(`${numbers2} Replies`, canvas.width / 4, canvas.height / 1.15);



                    // Pick up the pen
                    ctx.beginPath();
                    // Start the arc to form a circle
                    ctx.arc(64, 60, 30, 0, Math.PI * 2, true);
                    // Put the pen down
                    ctx.closePath();
                    // Clip off the region you drew on
                    ctx.clip();

                    const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
                    ctx.drawImage(avatar, 30, 30, 64, 60);



                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Comment.png');
                    message.channel.send(attachment)

                }
                if (toggle) return message.channel.send("This server has the \"Fun\" module disabled")
            })

    }

}
