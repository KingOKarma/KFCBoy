const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    ServerID: String,
    UserID: Array,
    TheUser: String,
    Type: Array,
    Reason: Array,
    Timestamp: Array,
    CaseNumber: Array
    
    
});
console.log("In the Log Schema")
module.exports = mongoose.model("Log", LogSchema);