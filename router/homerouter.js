const express = require('express')
const { home, purchase, uploaditems, credits, clearcredits, purchasehistory, updatecredits, sellitem, confirmsell, sellhistory, salecredits, clearsalecredits, updatesalecredits, deleteitems } = require('../controller/home')
const { updatepurcredit } = require('../middleware/Purcredit')
const router = express.Router()

router
    .route('/')
    .get(home)

router
    .route('/purchase')
    .get(purchase)
    .post(uploaditems)
router
    .route('/credits')
    .get(credits)
router
    .route('/clearcredits:client')
    .get(clearcredits)
    .post(updatepurcredit, updatecredits)

router
    .route('/purchasehistory')
    .get(purchasehistory)

router
    .route('/sellitem:itemname')
    .get(sellitem)
    .post(confirmsell)
router
    .route('/sellhistory')
    .get(sellhistory)
router
    .route('/salecredits')
    .get(salecredits)

router
    .route('/clearsalecredits:client')
    .get(clearsalecredits)
    .post(updatesalecredits)
router
    .route('/deletecredits/:client')
    .get(deleteitems)



module.exports = router