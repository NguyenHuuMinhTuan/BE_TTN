const express = require('express')
const router = express.Router();
const billMongoController = require('../controller/BillMongoController')

router.get('/',billMongoController.getAllBill)

router.get('/:account_id', billMongoController.getCartByAccountId)

router.post('/',billMongoController.createBill)

router.put('/:account_id',billMongoController.updateCartByAccountId)

module.exports = router