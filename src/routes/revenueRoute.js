const express = require('express')
const router = express.Router();

const revenueController = require('../controller/revenueController')

router.get('/',revenueController.getAllRevenue)

module.exports = router