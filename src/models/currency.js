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
<<<<<<< HEAD
=======
    UserID: String,
    ServerID: String,
    UserName: String,
>>>>>>> a7b7c70e3d31109088a8e360067219eb5fa1e4f2
    Inventory: {
        type: Map,
        of: String,
        default: {"rotten potato": "1"}
    }
});

module.exports = mongoose.model("Currency", CurrencyShcema)