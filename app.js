const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql2')

const port = 3000 || process.env.PORT;
const app = express();
app.use(cors());
// Middleware cần thiết
app.use(express.json()); // Cho phép xử lý JSON
app.use(express.urlencoded({ extended: true })); // Cho phép xử lý form data
app.use(cookieParser());

const morgan = require('morgan');
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
//CODE HERE
const pool = require('./src/utils/connectDB.js');
const connectDB = require('./src/utils/mongoDB.js')
connectDB();


app.use('/account', require('./src/routes/accountRoute.js'))
app.use('/bill', require('./src/routes/billRoute.js'))
app.use('/billDetail',require('./src/routes/billDetailRoute.js'))
app.use('/category',require('./src/routes/categoryRoute.js'))
app.use('/feedback',require('./src/routes/feedbackRoute.js'))
app.use('/info', require('./src/routes/infoRoute.js'))
app.use('/product',require('./src/routes/productRoute.js'))
app.use('/revenue',require('./src/routes/revenueRoute.js'))
app.use('/cart',require('./src/routes/cartRoute.js'))
app.use('/auth',require('./src/routes/authRoute.js'))
app.use('/voucher',require('./src/routes/voucherRoute.js'))


app.get('/', (req, res) => {
    res.render('index',); //{user: {name: 'admin', email: 'hello'}});
});


// Middleware xử lý lỗi 404: Khi không có route nào khớp
app.use((req, res, next) => {
    console.log('404 middleware hit');
    res.status(404).render('error404');
  });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});