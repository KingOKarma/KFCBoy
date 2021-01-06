const mongo = require("mongoose")

const newGuild = new mongo.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    Icon: String,
    Name: String,
}) 

module.exports = mongo.model("Guilds", newGuild)