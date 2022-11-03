const mongoose = require('mongoose')

const SellSchema = new mongoose.Schema({
    id: String,
    client: String,
    itemname: String,
    quant: String,
    grams: String,
    balance: String,
    Paid: String,
    Total: String,
})

module.exports = mongoose.model('SellItem', SellSchema)