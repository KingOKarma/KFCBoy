const mongoose = require("mongoose");

const prefix = new mongoose.Schema({
    ServerID: String,
    Prefix: String,
})

module.exports = mongoose.model("guildPrefix", prefix)