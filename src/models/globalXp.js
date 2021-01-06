const mongoose = require("mongoose");

const GlobalXpSchema = mongoose.Schema({
    UserID: String,
    xp: Number,
    level: Number,
    UserName: String,
    Avatar: String,
})

module.exports = mongoose.model("GXp", GlobalXpSchema)