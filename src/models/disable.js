const mongoose = require("mongoose");

const disableSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ServerID: String,
    Command : String,
    Disabled : Boolean
    
    
});
console.log("we're in the Schema")
module.exports = mongoose.model("Disable", disableSchema);