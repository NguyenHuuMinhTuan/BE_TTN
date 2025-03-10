const BillDetails = require('../model/billDetailModel')

class BillDetailsController {
    async getAllBillDetails(req,res){
        try{
            const billDetails = await BillDetails.getAllBillDetails();
            res.status(201).json(billDetails)
        
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
    async createBillDetail(req, res) {
            try {
                console.log("Request body:", req.body);
        
                const {  quantity, total_price, type_payment, id_bill  } = req.body;
                const convert_type_payment = parseInt(type_payment);
        
                const newBillDetail = { quantity, total_price, type_payment:convert_type_payment, id_bill };
    
                const result = await BillDetails.create(newBillDetail);
        
                console.log("Insert result:", result);
                if (result?.affectedRows > 0) {
                    res.status(201).json({ message: 'Create billDetail successfully' });
                } else {
                    res.status(400).json({ message: 'Failed to create billDetail' });
                }
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: error.message });
            }
        }
        
}
module.exports = new BillDetailsController;