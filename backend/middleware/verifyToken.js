const jwt = require("jsonwebtoken");
require('dotenv').config();

// Secret key for JWT
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        req.admin = decoded;
        next();
    });
};

module.exports = verifyToken;
