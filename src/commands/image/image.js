const Discord = require("discord.js")
const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'image',
    aliases: ["pic", "picture"],
    run: (_, message, bot, prefix, args) => {

        if(!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) return message.channel.send("I need the permission __**\"Embed Links\"**__ to use this command")

        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Image"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

         image(message);
                }
                if (toggle) return message.channel.send("This server has the \"Image\" module disabled")
            })
     }
    }
        function image(message) {
        const prefix = "k!"

        const args = message.content.slice(prefix.toLowerCase().length).trim().split(/ +/g);

            var cheerio = require("cheerio"); /* Used to extract html content, based on jQuery || install with npm install cheerio */
            var request = require("request"); /* Used to make requests to URLs and fetch response  || install with npm install request */





        var options = {

            url: "https://results.dogpile.com/serp?qc=images&q=" + args.join(' '),

            method: "GET",

            headers: {

                "Accept": "text/html",

                "User-Agent": "Chrome"

            }

        };


        request(options, function(error, response, responseBody) {
            if (error) {
                return;
            }

            $ = cheerio.load(responseBody);

            var links = $(".image a.link");

            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

            console.log(urls);
            if (!urls.length) {
                return;
            }

            const argsslice = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
            const embed = new Discord.MessageEmbed()
            embed
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .addField(`**${argsslice.join(' ')}**`, `${message.author} enjoy!`)
            .setImage(`${urls[Math.floor(Math.random() * urls.length)]}?size=1024`)
            .setFooter("if image does not display try again")
            .setColor(0x36cbf5)
            message.channel.send(embed);

        });
    
}

    