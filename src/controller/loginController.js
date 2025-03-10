const account = require('../model/accountModel')
class loginController{
     async login(req, res) {
            try {
                const { username, password } = req.body;
        
                // Kiểm tra xem user có tồn tại không
                const user = await User.checkUser(username);
                if (!user) {
                    return res.status(400).json({ message: 'Username does not exist' });
                }
        
                // Kiểm tra mật khẩu có đúng không
                const isMatch = await bcrypt.compare(password, user[0].PASSWORD);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Password is incorrect!' });
                }
        
                // Nếu đúng, trả về thành công
                res.status(200).json({ message: 'Login success' });
        
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
}