const pool = require('../utils/connectDB.js');

const getAll = async () =>{
    const [rows] = await pool.execute('SELECT * FROM feedback');
    return rows;
}
const create = async (newFeedback) => {
    const {star ,comment, account_id, product_id } = newFeedback;

    if (!star || !comment || !account_id || !product_id) {
        throw new Error("All fields are required");
    }

    const query = 'INSERT INTO feedback (star, comment, account_id, product_id) VALUES (?, ?, ?, ?)';
    const [rows] = await pool.execute(query, [star, comment, account_id,product_id]);
    return rows;
};
const update = async (id, updateCategory) => {
    const { star, comment, account_id,product_id } = updateCategory;
    
    let query = 'UPDATE feedback SET ';
    const values = [];

    if (star) {
        query += 'star = ?, ';
        values.push(star);
    }

    if (comment){
        query += 'comment = ?, ';
        values.push(comment);
    }

    if (account_id){
        query += 'account_id = ?, ';
        values.push(account_id);
    }

    if (product_id){
        query += 'product_id = ?, ';
        values.push(product_id);
    }
  
    query = query.slice(0, -2); // Xóa dấu "," cuối cùng
    query += ' WHERE id = ?';
    values.push(id);

    const [rows] = await pool.execute(query, values);
    return rows;
};

const remove = async (id) => {
    const query = 'DELETE FROM feedback WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows;
};
module.exports = {
    getAll,
    create,
    update,
    remove
}