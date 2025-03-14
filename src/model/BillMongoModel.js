const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    urlImg: { type: String, required: false },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const billSchema = new mongoose.Schema({
    account_id: { type: String, required: true },
    address:{type: String, required:true},
    phone:{type: Number, required:true},
    create_bill: { type: Date, default: Date.now },
    allItems: [itemSchema],
    totalPrice: { type: Number, required: true },
    method_payment: { type: String, required: true },
    voucher: { type: String, require: false },
    discount: { type: Number, reuquire: false, default: 0 },
    feedback: { type: Boolean, require: false, default:false },

});

module.exports = mongoose.model('Bill', billSchema);
