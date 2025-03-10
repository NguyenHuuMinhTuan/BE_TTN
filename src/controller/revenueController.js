const Revenue = require('../model/revenueModel')

class RevenueController{
      async getAllRevenue(req, res) {
            try {
                const revenue = await Revenue.getAll();
                res.status(201).json(revenue)
            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        }
}
module.exports = new RevenueController