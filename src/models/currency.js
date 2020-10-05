const mongoose = require("mongoose");

const CurrencyShcema = new mongoose.Schema({
    Nuggies: Number,
    UserID: String,
    ServerID: String,
    Inventory: Map,
});

module.exports = mongoose.model("Currency", CurrencyShcema)