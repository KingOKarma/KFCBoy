const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 

module.exports = {
    name: 'kk',

    run: (_, message) => {
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });



        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Fun"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {

                    message.channel.send(`Thats racist`)
                    console.log("kk was said");
                }
                if (toggle) return message.channel.send("This server has the \"Fun\" module disabled")
            })
    }
}