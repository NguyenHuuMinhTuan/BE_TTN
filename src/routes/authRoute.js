const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// [POST] localhost:3000/auth/login
router.post('/login', authController.login);
// [GET] localhost:3000/auth/login
router.get('/login',(req, res) => {
    res.render('login');
});
// [GET] localhost:3000/auth/logout
router.get('/logout', authController.logout);
module.exports = router;