const pool = require('../utils/connectDB.js');

const getAll = async () => {
    const [rows] = await pool.execute('SELECT * FROM Revenue');
    return rows;
};


module.exports = {
    getAll,

};
