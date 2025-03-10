const Voucher = require('../model/voucherModel.js');
class VoucherController {
    async getAllVouchers(req, res) {
        try {
            const vouchers = await Voucher.getAll();
            res.status(201).json(vouchers)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
   
    async createVoucher(req, res) {
        try {
            console.log("Request body:", req.body);

            const {Date_sale, Date_end, discount, title, code, quantity} = req.body;

           const newVoucher = {Date_sale, Date_end, discount, title, code, quantity};

            const result = await Voucher.create(newVoucher);

            console.log("Insert result:", result);

            if (result?.affectedRows > 0) {
                res.status(201).json({ message: 'Create Voucher successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create Voucher' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateVoucher(req, res) {
        try {
            const { id } = req.params;

            const { Date_sale, Date_end, discount, title, code, quantity } = req.body;

            console.log("Request body:", req.body);
            const so_luong = parseInt(quantity);
            
            if ( !Date_sale || !Date_end ||  !discount || !title  ||!code ||!quantity) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }

            const updatedVoucher = {  Date_sale, Date_end, discount, title, code , so_luong};

            const result = await Voucher.update(id, updatedVoucher);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Voucher updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update Voucher' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteVoucher(req, res) {
        try {
            const { id } = req.params;
            const result = await Voucher.remove(id);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Voucher deleted successfully' });
            } else {
                res.status(400).json({ message: 'Failed to delete Voucher' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new VoucherController;