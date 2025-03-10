const pool = require('../utils/connectDB')

const getAllBillDetails = async ()=>{
    const [rows] = await pool.execute('SELECT * FROM bill_detail');
    return rows;
}
const create = async (newBillDetail) => {
    const { quantity, total_price, type_payment, id_bill } = newBillDetail;

    if (!quantity ||  !total_price ||  !type_payment || !id_bill) {
        throw new Error("All fields (quantity, total_price, type_payment, id_bill) are required");
    }

    const query = 'INSERT INTO Bill_detail (quantity, total_price, type_payment, id_bill) VALUES (?, ?, ?, ?)';
    const [rows] = await pool.execute(query, [quantity, total_price, type_payment, id_bill]);

    return rows;
};

module.exports = {
    getAllBillDetails,
    create
}