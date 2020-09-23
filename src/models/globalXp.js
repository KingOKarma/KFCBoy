const mongoose = require("mongoose");

const XpSchema = mongoose.Schema({
    UserID: String,
    xp: Number,
    level: Number,
    UserName: String,
})

module.exports = mongoose.model("GXp", XpSchema)