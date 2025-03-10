const express = require('express')
const router = express.Router()
const infoController = require('../controller/infoController')

router.get('/',infoController.getAllInfo)

router.post('/',infoController.createInfo)

router.put('/:id',infoController.updateInfo)

router.delete('/:id',infoController.deleteInfo)

module.exports = router