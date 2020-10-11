const mongoose = require("mongoose");

const CurrencyShcema = new mongoose.Schema({
    Nuggies: {
        type: Number,
        default: 0,
    },
    UserID: String,
    ServerID: String,
    Inventory: {
        type: Map,
        default: "",
    }
});

module.exports = mongoose.model("Currency", CurrencyShcema)