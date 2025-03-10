const pool = require('../utils/connectDB.js');

const getAll = async () => {
    const [rows] = await pool.execute('SELECT * FROM info');
    return rows;
};

const create = async (newInfo) => {
    const { address, tel, account_id } = newInfo;

    if (!address || !tel || !account_id) {
        throw new Error("All fields (address, tel, account_id) are required");
    }

    const query = 'INSERT INTO Info (address, tel, account_id) VALUES (?, ?, ?)';
    const [rows] = await pool.execute(query, [address, tel, account_id]);

    return rows;
};

const update = async (id, updatedinfo) => {
    const { address, tel, account_id } = updatedinfo;
    
    let query = 'UPDATE info SET ';
    const values = [];

    if (address) {
        query += 'address = ?, ';
        values.push(address);
    }
    if (tel) {
        query += 'tel = ?, ';
        values.push(tel);
    }
    if (account_id) {
        query += 'account_id = ?, ';
        values.push(account_id);
    }

    query = query.slice(0, -2); // Xóa dấu "," cuối cùng
    query += ' WHERE id = ?';
    values.push(id);

    const [rows] = await pool.execute(query, values);
    return rows;
};

const remove = async (id) => {
    const query = 'DELETE FROM Info WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows;
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
