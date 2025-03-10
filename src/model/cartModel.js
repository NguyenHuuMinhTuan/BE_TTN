
const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    account_id:{
        type:String, required: true
    },
    product_id: {
        type: Number, required: true
    },
    name: {
        type: String, required: true
    },
    urlImg: { 
        type: String, required: false
    },
    quantity: {
        type: Number, require: true
    },
    price: {
        type: Number, require: true
    },

})

module.exports = mongoose.model('Cart', cartSchema);