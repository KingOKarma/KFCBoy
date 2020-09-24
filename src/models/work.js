const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    UserID: String,
    ServerID: String,
    Work: String,
});

module.exports = mongoose.model("Work", workSchema)