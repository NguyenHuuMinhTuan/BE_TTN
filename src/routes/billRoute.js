const express = require('express');
const router = express.Router();
const billController = require('../controller/billController')

router.get('/',billController.getAllBills)

router.post('/',billController.createBill)

router.put('/:id',billController.updateBill)

router.delete('/:id',billController.deleteAccount)
 
module.exports = router
