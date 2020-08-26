const mongoose = require("mongoose");

const repSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserID: String,
    rep: Number
    
    
});
console.log("we're in the Schema")
module.exports = mongoose.model("Rep", repSchema);