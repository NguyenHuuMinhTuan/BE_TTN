const express = require('express')
const router = express.Router();

const cartController = require('../controller/cartController')

router.get('/',cartController.getAllCart)

router.get('/:account_id', cartController.getCartByAccountId)

router.delete("/:account_id",cartController.clearCartById)

router.post('/',cartController.createCart)

router.put('/:id',cartController.updateCartById)

router.delete('/:account_id/:product_id',cartController.deleteProductFromCart)

module.exports = router