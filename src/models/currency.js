const mongoose = require("mongoose");

const CurrencyShcema = new mongoose.Schema({
    Nuggies: Number,
    UserID: String,
    ServerID: String,
    Inventory: Map,
    Premium: Boolean,
    Work: String,
});

module.exports = mongoose.model("Currency", CurrencyShcema)