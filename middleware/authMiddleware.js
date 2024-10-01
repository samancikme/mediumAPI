const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token mavjud emas' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Foydalanuvchi ma'lumotlarini qo'shamiz
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Noto‘g‘ri token' });
    }
};

module.exports = authMiddleware;
