const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'bucket',
    aliases: ["hat"],
    run: (_, message, args, prefix, MongoToggle, theUser) => {
        if (!message.guild.me.permissionsIn(message.channel).has("ATTACH_FILES")) return message.channel.send("I need the permission __**\"Attach Files\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "KFC"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    if (args[0] === undefined) {
                        let saidmsg = `Here **${message.author.tag}**, I gave you a bucket!\nGive me a second to get the image ready!`

                        bucket(message, message.author, saidmsg);
                    }
                    else if (theUser.id === message.author.id) {
                        let saidmsg = `Here **${message.author.tag}**, I gave you a bucket!\nGive me a second to get the image ready!`
                        bucket(message, message.author, saidmsg);

                    }
                    else if (theUser === undefined) {
                        let saidmsg = `Here **${message.author.tag}**, I gave you a bucket!\nGive me a second to get the image ready!`
                        bucket(message, message.author, saidmsg);

                    } else if (theUser.id === "614110037291565056") {
                        let saidmsg = `Well im already wearing a bucket but sure`
                        bucket(message, theUser.user, saidmsg);

                    } else {
                        let saidmsg = `Here **${theUser.user.tag}**, **${message.author.tag}** gave you a bucket!\nGive me a second to get the image ready!`

                        bucket(message, theUser.user, saidmsg);
                    }


                }
                if (toggle) return message.channel.send("This server has the \"KFC\" module disabled")
            })




    }
}
async function bucket(message, targetUser, saidmsg) {


    // let targetUser = mentionedUser


    // if (targetUser) {
    const Canvas = require('canvas');
    // let targetUser = message.guild.member(message.mentions.users.first());

    const canvas = Canvas.createCanvas(450, 500);
    const ctx = canvas.getContext('2d');



    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, 1000);


    const avatar = await Canvas.loadImage(targetUser.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 0, 100, canvas.width, 400);



    const bucket = await Canvas.loadImage('./commands/kfc/kfchat.png');
    ctx.drawImage(bucket, -50, 0, 550, 550);




    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${targetUser.id}bucket.png`);





    message.channel.send(saidmsg)
    message.channel.send(attachment)
        .catch((err) => {
            message.reply("I couldn't give you a bucket ): Reason being: \n" + err)
        })
    // message.channel.send(attachment)



    // } else {
    //     const Canvas = require('canvas');

    //     const canvas = Canvas.createCanvas(450, 500);
    //     const ctx = canvas.getContext('2d');


    //     ctx.fillStyle = "#000000";
    //     ctx.fillRect(0, 0, canvas.width, 1000);

    //     const avatar = await Canvas.loadImage(targetUser.displayAvatarURL({ dynamic: true }));
    //     ctx.drawImage(avatar, 0, 100, canvas.width, 400);



    //     const bucket = await Canvas.loadImage('./commands/kfc/kfchat.png');
    //     ctx.drawImage(bucket, -50, 0, 550, 550);




    //     const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${targetUser.username}bucket.png`);

    //     message.reply(`enjoy your bucket!`)
    //     message.channel.send(attachment)


    // }









}
