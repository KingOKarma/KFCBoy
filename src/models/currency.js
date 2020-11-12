const mongoose = require("mongoose");

const CurrencyShcema = new mongoose.Schema({
    UserID: String,
    ServerID: String,
    work: {
        type: String,
        default: "",
    },
    Nuggies: {
        type: Number,
        default: 100,
    },
    Inventory: {
        type: Map,
        of: String,
        default: {"rotten potato": "1"}
    }
});

module.exports = mongoose.model("Currency", CurrencyShcema)