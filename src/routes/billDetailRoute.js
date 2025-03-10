const express = require('express');
const router = express.Router();
const billDetailsController = require('../controller/billDetailController')

router.get('/',billDetailsController.getAllBillDetails)

router.post('/',billDetailsController.createBillDetail)

module.exports = router