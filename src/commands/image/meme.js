let randomPuppy = require('random-puppy');
const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json');
module.exports = {
    name: 'meme',
    aliases: ["memes"],
    run: (_, message, args, bot) => {
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Image"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    let reddit = [
                        "meme",
                        "animemes",
                        "MemesOfAnime",
                        "animememes",
                        "AnimeFunny",
                        "dankmemes",
                        "dankmeme",
                        "wholesomememes",
                        "MemeEconomy",
                        "techsupportanimals",
                        "meirl",
                        "me_irl",
                        "2meirl4meirl",
                        "AdviceAnimals"
                    ]

                    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

                    message.channel.startTyping();

                    randomPuppy(subreddit).then(async url => {
                        await message.channel.send(`Enjoy <:Kaineshrug:711591140125704242> \n This meme was from **r/${subreddit}**`, {
                            files: [{
                                attachment: url,
                                name: 'meme.png'
                            }]
                        }).then(() => message.channel.stopTyping());
                    }).catch(err => console.error(err));
                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })



    }
}
