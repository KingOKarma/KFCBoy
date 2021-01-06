const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    discordID: {
        type: String,
        required: true,
        unique: true
    },
    discordTag: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    guilds: {
        type: Array,
        required: true,
    }

})

module.exports = mongoose.model("UserSchema", userSchema)