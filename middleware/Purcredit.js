const Purcredit = require('../model/Purcredit')

exports.updatepurcredit = async (req, res, next) => {
    let { balance, paid, eid, total } = req.body
    let creditdata = await Purcredit.findOne({ id: eid })
    if (paid == total) {
        creditdata.balance = 0
        creditdata.Paid = total
    }
    else {
        let a = parseInt(total)
        let b = parseInt(paid)
        let c = a - b
        creditdata.balance = c
        creditdata.Paid = paid
    }

    await creditdata.save()
    next()
}