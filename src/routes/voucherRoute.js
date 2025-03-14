const express = require('express');
const router = express.Router();
const voucherController = require('../controller/voucherController')

router.get('/',voucherController.getAllVouchers)

router.post('/',voucherController.createVoucher)

router.put('/:id',voucherController.updateVoucher)

router.delete('/:id',voucherController.deleteVoucher)

module.exports = router