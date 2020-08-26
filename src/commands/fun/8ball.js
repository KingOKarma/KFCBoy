const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: '8ball',
    aliases: ["eightball", "fortune"],
    run: (_, message, args, bot) => {
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => {
            console.error("mongoose error" + err);
        })


        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Fun"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    if (!args.join(' ')) return message.reply("To have a your future read you must ask of your future first? \nPlease specify what you want to ask about your future?")

                    let fortune = ['Ain\'t gonna happn', 'This will indeed come true', 'KFC grants decides this will happen', '**Bucket Boi say:** "Nope"',
                        'I mean... it might happen ¯\_(ツ)_/¯', 'I\'m swaying towards more no but it could happen', 'Yeahhhhhh... no', 'pft idk',
                        'possibly this may not not happen', 'this will not will not not happen', 'try asking someone else i\'m busy', 'ummm... yes?',
                        'yes', 'no', 'maybe', 'possibly', 'possibly not', 'try getting a higher role first then i\'ll tell you', 'how about no', 'how about yes', '???? no clue dude'];
                    let random = fortune[Math.floor(Math.random() * fortune.length)];

                    message.reply(random);
                }
                if (toggle) return message.channel.send("This server has the \"Fun\" module disabled")
            })

    }
}