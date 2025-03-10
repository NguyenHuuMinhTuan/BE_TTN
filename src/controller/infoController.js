const Info = require('../model/infoModel')

class InfoController {
    async getAllInfo(req, res) {
        try {
            const info = await Info.getAll();
            res.status(201).json(info)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    async createInfo(req, res) {
        try {
            console.log("Request body:", req.body);

            const { address, tel, account_id } = req.body;

            const newInfo = { address, tel, account_id };

            const result = await Info.create(newInfo);

            console.log("Insert result:", result);

            if (result?.affectedRows > 0) {
                res.status(201).json({ message: 'Create Infomation successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create Infomation' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateInfo(req, res) {
        try {
            const { id } = req.params;
            const { address, tel, account_id } = req.body;

            if (!address || !tel || !account_id) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }

            const updatedInfo = { address, tel, account_id };
            const result = await Info.update(id, updatedInfo);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Infomation updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update Infomation' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteInfo(req, res) {
        try {
            const { id } = req.params;
            const result = await Info.remove(id);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Infomation deleted successfully' });
            } else {
                res.status(400).json({ message: 'Failed to delete Infomation' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new InfoController;