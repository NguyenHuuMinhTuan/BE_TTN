const pool = require('../utils/connectDB.js');

const getAll = async () => {
    const [rows] = await pool.execute('SELECT * FROM Bill');
    return rows;
};

const create = async (newBill) => {
    const { id_product, id_account } = newBill;

    if (!id_product || !id_product) {
        throw new Error("All fields (id_product, id_account) are required");
    }

    const query = 'INSERT INTO bill (id_product, id_account) VALUES (?, ?)';
    const [rows] = await pool.execute(query, [id_product, id_account]);

    return rows;
};

const update = async (id, updatedBill) => {
    const { id_product, id_account } = updatedBill;
    
    let query = 'UPDATE bill SET ';
    const values = [];

    if (id_product) {
        query += 'id_product = ?, ';
        values.push(id_product);
    }
    if (id_account) {
        query += 'id_account = ?, ';
        values.push(id_account);
    }

    query = query.slice(0, -2); // Xóa dấu "," cuối cùng
    query += ' WHERE id = ?';
    values.push(id);

    const [rows] = await pool.execute(query, values);
    return rows;
};

const remove = async (id) => {
    const query = 'DELETE FROM bill WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows;
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
