const Account = require('../model/accountModel');
const bcrypt = require('bcrypt');
const auth = require('../utils/auth');

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Kiểm tra thông tin đầu vào
            if (!username || !password) {
                console.log("Missing username or password");
                return res.status(400).json({ error: "Username and password are required" });
            }

            // Lấy thông tin tài khoản từ database
            const account = await Account.getUsernameByAccount(username);
            const role = account.length > 0 ? account[0].type_account : null;
            const id = account.length > 0 ? account[0].id : null;

            if (!account || account.length === 0) {
                console.log(`User not found: ${username}`);
                return res.redirect("/auth/login");
            }

            const hashedPassword = account[0]?.password;
            console.log("Hashed password from DB:", hashedPassword);

            if (!hashedPassword) {
                console.log("No password found for user");
                return res.status(500).json({ error: "Server error: No password found in database" });
            }

            // So sánh mật khẩu nhập vào với mật khẩu đã hash trong DB
            const isMatch = await bcrypt.compare(password, hashedPassword);

            if (!isMatch) {
                console.log("Password does not match");
                return res.redirect("/auth/login");
            }

            // Đăng nhập thành công -> Tạo token
            const accessToken = auth.generateAccessToken({ username, role });

            // Lưu token vào cookie
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });

            console.log("Login successful:", username);

            // Gửi phản hồi JSON thay vì redirect
            return res.status(200).json({ success: true, message: "Login successful", accessToken, username, role, id });

        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ succes: false, error: "Internal Server Error" });
        }
    }

    logout(req, res) {
        try {
            res.clearCookie('accessToken');
            console.log("User logged out");
            return res.redirect("/auth/login");
        } catch (error) {
            console.error("Logout error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new AuthController();
