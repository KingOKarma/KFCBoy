let randomPuppy = require('random-puppy');
const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'wholesome',
    aliases: ["cute"],
    run: (_, message, args, bot) => {
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Image"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {



                    let reddit = [

                        "wholesomememes",
                        "wholesome",
                        "WholesomeComics",
                        "wholesomepics"

                    ]

                    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

                    message.channel.startTyping();

                    randomPuppy(subreddit).then(async url => {
                        await message.channel.send(`Enjoy <:Kawaii:705565375647186984> \n This wholesomeness was from **r/${subreddit}**`, {
                            files: [{
                                attachment: url,
                                name: 'wholesome.png'
                            }]
                        }).then(() => message.channel.stopTyping());
                    }).catch(err => console.error(err));

                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })


    }
}
