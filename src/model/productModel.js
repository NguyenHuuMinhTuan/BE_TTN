const pool = require('../utils/connectDB.js');

const getAll = async () => {
    const [rows] = await pool.execute('SELECT * FROM Product');
    return rows;
};

const create = async (newproducts) => {
    const { name, price, urlImg, des, status, discount, price_sales, category_id, quantity } = newproducts;


    if (!name || !price || !urlImg || !des || !status || !discount || !price_sales || !category_id || !quantity) {
        throw new Error("All fields (name, price,urlImg,des, status, discount, price_sales, category_id, quantity) are required");
    }

    const query = 'INSERT INTO product (name, price, urlImg,description, status, discount, price_sales, category_id, quantity ) VALUES (?, ?,?, ?, ?, ?,?,?,?)';
    const [rows] = await pool.execute(query, [name, price, urlImg, des, status, discount, price_sales, category_id, quantity]);

    return rows;
};

const update = async (id, updatedProduct) => {
    const { name, price, urlImg, des, status, discount, price_sales, category_id, quantity } = updatedProduct;

    let query = 'UPDATE product SET ';
    const values = [];

    if (name) {
        query += 'name = ?, ';
        values.push(name);
    }
    if (price) {
        query += 'price = ?, ';
        values.push(price);
    }
    if (urlImg) {
        query += 'urlImg = ?, ';
        values.push(urlImg);
    }
    if (des) {
        query += 'description = ?, ';
        values.push(des);
    }
    if (status) {
        query += 'status = ?, ';
        values.push(status);
    }

    if (discount) {
        query += 'discount = ?, ';
        values.push(discount);
    }

    if (price_sales) {
        query += 'price_sales = ?, ';
        values.push(price_sales);
    }

    if (category_id) {
        query += 'category_id = ?, ';
        values.push(category_id);
    }

    if (quantity) {
        query += 'quantity = ?, ';
        values.push(quantity);
    }

    query = query.slice(0, -2);
    query += ' WHERE id = ?';
    values.push(id);

    const [rows] = await pool.execute(query, values);
    return rows;
};

const remove = async (id) => {
    const query = 'DELETE FROM product WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows;
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
