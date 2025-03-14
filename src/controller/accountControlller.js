const Account = require('../model/accountModel.js');
const bcrypt = require('bcrypt');

class AccountController {
    async getAllAccounts(req,res){
        try {
            const accouts = await Account.getAll();
            res.status(201).json(accouts)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    async createAccount(req, res) {
        try {
            console.log("Request body:", req.body);
    
            const { username, password, email } = req.body;

           
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newAccount = { username, password: hashedPassword, email };

            const result = await Account.create(newAccount);
    
            console.log("Insert result:", result);
            if (result?.affectedRows > 0) {
                res.status(201).json({ message: 'Create account successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create account' });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
    
    async updateAccount(req, res) {
        console.log("Dữ liệu nhận được:", req.body);
        try {
            const { id } = req.params;
            const { username, email, password } = req.body;

            if (!username && !email && !password) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }
            let hashedPassword = null;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }
            const updatedUser = { username, email, password: hashedPassword };
            const result = await Account.update(id, updatedUser);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Account updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update account' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateActiveById(req, res) {
        try {
            const { id } = req.params;
            const { active } = req.body;

            if (!active) {
                return res.status(400).json({ message: 'At least one field is required for update' });
            }
           
            const updatedUser = { active};
            const result = await Account.updateActive(id, updatedUser);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Account active updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update account active' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteAccount(req, res) {
        try {
            const { id } = req.params;

            const result = await Account.remove(id);

            if (result?.affectedRows > 0) {
                res.status(200).json({ message: 'Account deleted successfully' });
            } else {
                res.status(400).json({ message: 'Failed to delete account' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
    

module.exports = new AccountController;