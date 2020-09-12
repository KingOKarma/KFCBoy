const Discord = require("discord.js")
const Toggle = require("../../models/toggle.js");
module.exports = {
    name: 'bucket',
    aliases: ["hat"],
    run: async (_, message) => {
        if (!message.guild.me.permissionsIn(message.channel).has("ATTACH_FILES")) return message.channel.send("I need the permission __**\"Attach Files\"**__ to use this command")
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "KFC"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    bucket(message);



                }
                if (toggle) return message.channel.send("This server has the \"KFC\" module disabled")
            })




    }
}
async function bucket(message) {
    let targetUser = message.guild.member(message.mentions.users.first());



    // case "<@614110037291565056>": {


    //     break;
    // }

    // case "<@!614110037291565056>": {


    //     break;
    // }




    if (targetUser) {
        const Canvas = require('canvas');
        let targetUser = message.guild.member(message.mentions.users.first());

        const canvas = Canvas.createCanvas(450, 500);
        const ctx = canvas.getContext('2d');



        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, 1000);


        const avatar = await Canvas.loadImage(targetUser.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 0, 100, canvas.width, 400);



        const bucket = await Canvas.loadImage('./commands/kfc/kfchat.png');
        ctx.drawImage(bucket, -50, 0, 550, 550);




        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${targetUser.user.tag}bucket.png`);

        message.reply(`Here **${targetUser.displayName}**, **${message.member.displayName}** gave you a bucket!`)
        message.channel.send(attachment)



    } else {
        const Canvas = require('canvas');

        const canvas = Canvas.createCanvas(450, 500);
        const ctx = canvas.getContext('2d');


        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, 1000);

        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 0, 100, canvas.width, 400);



        const bucket = await Canvas.loadImage('./commands/kfc/kfchat.png');
        ctx.drawImage(bucket, -50, 0, 550, 550);




        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${message.member.user.tag}bucket.png`);

        message.reply(`enjoy your bucket!`)
        message.channel.send(attachment)


    }









}
