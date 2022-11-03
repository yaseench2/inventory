const mongoose = require('mongoose')

const PurcreditSchema = new mongoose.Schema({
    id: String,
    client: String,
    itemname: String,
    balance: String,
    Paid: String,
    Total: String,
})

module.exports = mongoose.model('Purcredit', PurcreditSchema)