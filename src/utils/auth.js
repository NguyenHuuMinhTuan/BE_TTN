const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = (user,role) => {
  return jwt.sign({ user, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1h", // Đặt mặc định nếu biến môi trường chưa có
  });
};

// verify token return payload
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
};

const middlewareAuth = (req, res, next) => {
  try {
    let token = req.cookies.accessToken; // Kiểm tra nếu req.cookies tồn tại
    console.log(token);
    
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token nè :"+token);
       // Lấy token từ headers nếu không có trong cookie
    }

    if (!token) {
      console.log("No accessToken found in cookies or headers");
      return res.status(401).json({ error: "Access denied. No token provided" });
    }

    const user = verifyToken(token);

    if (!user) {
      console.log("Invalid token received");
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = user; // Lưu thông tin user vào request để sử dụng tiếp theo
    next();
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  generateAccessToken,
  verifyToken,
  middlewareAuth,
};
