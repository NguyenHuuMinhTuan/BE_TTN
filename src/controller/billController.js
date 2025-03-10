const Bill = require('../model/billModel.js');

class BillController {
    async getAllBills(req, res) {
        try {
            const bills = await Bill.getAll();
            res.status(201).json(bills)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async createBill(req, res) {
        try {
            console.log("Request body:", req.body);

            const { id_product, id_account } = req.body;

            const newBill = { id_product, id_account };

            const result = await Bill.create(newBill);

            console.log("Insert result:", result);

            if (result?.affectedRows > 0) {
                res.status(201).json({ message: 'Create bill successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create bill' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateBill(req, res) {
        try {
            const { id } = req.params;
            const { id_product, id_account } = req.body;

            if (!id_product && !id_account) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }

            const updatedBill = { id_product, id_account };
            const result = await Bill.update(id, updatedBill);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Account updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update account' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteAccount(req, res) {
        try {
            const { id } = req.params;
            const result = await Bill.remove(id);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Bill deleted successfully' });
            } else {
                res.status(400).json({ message: 'Failed to delete bill' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new BillController;