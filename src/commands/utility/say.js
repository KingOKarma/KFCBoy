const mongoose = require("mongoose");
const Toggle = require("../../models/toggle.js");
const config = require('../../config.json'); 
module.exports = {
    name: 'say',
    aliases: ["s"],

    run: (_, message, args) => {
        mongoose.connect(config.tgtoggle, { useNewUrlParser: true, useUnifiedTopology: true });
        Toggle.findOne({
            ServerID: message.guild.id,
            Command: "Utility"
        },
            (err, toggle) => {

                if (err) console.log(err);
                if (!toggle) {
        message.delete();
        message.channel.send(args.join(' '))
    }
    if (toggle) return message.channel.send("This server has the \"Utility\" module disabled")
})
    }
}