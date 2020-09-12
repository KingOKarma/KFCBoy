const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'karma',
    aliases: ["kaine"],
    run: (_, message) => {

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Image"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {


                    message.channel.send("This may take a few seconds");

                    number = 4;
                    imageNumber = Math.floor(Math.random() * (number - 1 + 1)) + 1;



                    number = 4;
                    var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;
                    switch (random) {
                        case 1:
                            let png = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70'];
                            let pngsend = png[Math.floor(Math.random() * png.length)];
                            message.channel.send({ files: ["./images/" + pngsend + ".png"] });



                            break;


                        case 2:
                            let mp4 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'];
                            let mp4send = mp4[Math.floor(Math.random() * mp4.length)];
                            message.channel.send({ files: ["./images/" + mp4send + ".mp4"] });



                            break;


                        case 3:
                            let jpg = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'];
                            let jpgsend = jpg[Math.floor(Math.random() * jpg.length)];
                            message.channel.send({ files: ["./images/" + jpgsend + ".jpg"] });


                            break;


                        case 4:
                            let gif = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
                                '27'];
                            let gifsend = gif[Math.floor(Math.random() * gif.length)];
                            message.channel.send({ files: ["./images/" + gifsend + ".gif"] });



                            break;




                    }
                    setTimeout(() => {

                        message.channel.send('Enjoy :D'), { time: 20000 };
                    })
                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })
    }
}