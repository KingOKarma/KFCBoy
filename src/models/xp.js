const mongoose = require("mongoose");

const XpSchema = mongoose.Schema({
    ServerID: String,
    UserID: String,
    xp: Number,
    level: Number,
})

module.exports = mongoose.model("XP", XpSchema)