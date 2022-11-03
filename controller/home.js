const itemlist = require('../model/Items')
const selllist = require('../model/Sell')
const Purcredit = require('../model/Purcredit')

exports.home = async (req, res) => {
    let Itemlist = await itemlist.find()
    res.render('home', { Itemlist })
}
exports.purchase = async (req, res) => {

    res.render('purchas')
}
exports.uploaditems = async (req, res) => {
    let { itemname, Quantity, grams, Balance, Paid, Total, client } = req.body
    let id = `${Date.now()}`
    await itemlist.create({
        id: id,
        client: client,
        itemname: itemname,
        quant: Quantity,
        grams: grams,
        balance: Balance,
        Paid: Paid,
        Total: Total,

    })
    await Purcredit.create({
        id: id,
        client: client,
        itemname: itemname,
        balance: Balance,
        Paid: Paid,
        Total: Total
    })
    res.redirect('/')
}

exports.credits = async (req, res) => {
    let creditlist = await Purcredit.find()
    res.render('credits', { creditlist })
}
exports.clearcredits = async (req, res) => {
    let { client } = req.params
    let editor = await Purcredit.findOne({ client: client })
    res.render('clearcredit', { editor })
}
exports.updatecredits = async (req, res) => {
    let { balance, paid, eid, total } = req.body
    let updatedata = await itemlist.findOne({ id: eid })
    if (paid == total) {
        updatedata.balance = 0
        updatedata.Paid = total
    }
    else {
        let a = parseInt(total)
        let b = parseInt(paid)
        let c = a - b
        updatedata.balance = c
        updatedata.Paid = paid
    }
    await updatedata.save()
    return res.redirect('/credits')

}
exports.purchasehistory = async (req, res) => {
    let Itemlist = await itemlist.find()
    res.render('purchase history', { Itemlist })
}

exports.sellitem = async (req, res) => {
    let { itemname } = req.params
    let buyer = await itemlist.findOne({ itemname: itemname })
    res.render('sellitems', { buyer })
}
exports.confirmsell = async (req, res) => {
    let { client, itemname, Quantity, wieght, Balance, Paid, Total } = req.body
    let id = `${Date.now()}`
    await selllist.create({
        id: id,
        client: client,
        itemname: itemname,
        quant: Quantity,
        grams: wieght,
        balance: Balance,
        Paid: Paid,
        Total: Total,

    })
    let curquant = await itemlist.findOne({ itemname: itemname })
    let qn = curquant.quant
    curquant.quant = parseInt(qn) - parseInt(Quantity)
    await curquant.save()

    res.redirect('/sellhistory')

}
exports.sellhistory = async (req, res) => {
    let items = await selllist.find()
    res.render('sellhistory', { items })
}
exports.salecredits = async (req, res) => {
    let salecredits = await selllist.find({ balance: { $gt: 0 } })
    res.render('salecredits', { salecredits })
}
exports.clearsalecredits = async (req, res) => {
    let { client } = req.params
    let editor = await selllist.findOne({ client: client })
    res.render('clearsalecredit', { editor })
}
exports.updatesalecredits = async (req, res) => {
    let { balance, paid, eid, total } = req.body
    let updatedata = await selllist.findOne({ id: eid })
    if (paid == total) {
        updatedata.balance = 0
        updatedata.Paid = total
    }
    else {
        updatedata.balance = parseInt(total) - parseInt(paid)
        updatedata.Paid = paid
    }
    await updatedata.save()
    return res.redirect('/salecredits')

}
exports.deleteitems = async (req, res) => {
    await Purcredit.deleteOne({ client: req.params.client })
    res.redirect('/credits')

}