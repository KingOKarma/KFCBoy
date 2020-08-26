const mongoose = require("mongoose");

const ToggleSchema = new mongoose.Schema({
    ServerID: String,
    Command : String,
    
    
});
console.log("we're in the Toggle Schema")
module.exports = mongoose.model("Toggle", ToggleSchema);