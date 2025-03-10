const pool = require('../utils/connectDB.js');

const getAll = async () =>{
    const [rows] = await pool.execute('SELECT * FROM category');
    return rows;
}
const create = async (newCategory) => {
    const {name } = newCategory;

    if (!name) {
        throw new Error("All fields (name) are required");
    }

    const query = 'INSERT INTO category (name) VALUES (?)';
    const [rows] = await pool.execute(query, [name]);

    return rows;
};
const update = async (id, updateCategory) => {
    const { name } = updateCategory;
    
    let query = 'UPDATE category SET ';
    const values = [];

    if (name) {
        query += 'name = ?, ';
        values.push(name);
    }

    query = query.slice(0, -2); // Xóa dấu "," cuối cùng
    query += ' WHERE id = ?';
    values.push(id);

    const [rows] = await pool.execute(query, values);
    return rows;
};

const remove = async (id) => {
    const query = 'DELETE FROM category WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows;
};
module.exports = {
    getAll,
    create,
    update,
    remove
}