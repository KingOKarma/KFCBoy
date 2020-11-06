const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
    ServerID: String,
    items: {
        type: Array,
        default: [
            {
                name: "Gold Nuggie",
                price: 100000,
                default: true
            },
            {
                name: "World class cooking oil",
                price: 100000,
                default: true
            },
            {
                name: "Golden Nuggie magnifying glass",
                price: 100000,
                default: true
            }
    ]
    }
})

module.exports = mongoose.model("Shop", shopSchema)