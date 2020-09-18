const mongoose = require("mongoose");

const WelcomeSchema = new mongoose.Schema({
    ServerID: String,
    WelcomePing : String,
    
    
});
console.log("WelcomeSchema go brr")
module.exports = mongoose.model("Welcome", WelcomeSchema);