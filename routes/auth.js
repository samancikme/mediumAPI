const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // User modelini chaqiramiz
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key'; // JWT maxfiy kalit

// Ro'yxatdan o'tish (register)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Foydalanuvchini tekshirish
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Foydalanuvchi mavjud!' });
    }

    // Parolni shifrlash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yangi foydalanuvchini saqlash
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Ro‘yxatdan o‘tish muvaffaqiyatli!' });
});

// Kirish (login)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Foydalanuvchini tekshirish
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'Foydalanuvchi topilmadi!' });
    }

    // Parolni tekshirish
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Noto‘g‘ri parol!' });
    }

    // JWT token yaratish
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Kirish muvaffaqiyatli', token });
});

module.exports = router;
