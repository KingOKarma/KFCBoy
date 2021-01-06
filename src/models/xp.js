const mongoose = require("mongoose");

const XpSchema = mongoose.Schema({
    ServerID: String,
    UserID: String,
    xp: Number,
    level: Number,
    UserName: String,
    ServerName: String,
    AvatarURL: String,

})

module.exports = mongoose.model("Xp", XpSchema)