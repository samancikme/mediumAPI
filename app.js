const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const authorRoutes = require('./routes/author');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// .env faylidan muhim o'zgaruvchilarni yuklash
require('dotenv').config();

// MongoDB ga ulanish
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB ga muvaffaqiyatli ulandik');
  })
  .catch((error) => {
    console.log('MongoDB ga ulanishda xatolik:', error);
  });

// Autentifikatsiya marshrutlari
app.use('/auth', authRoutes);

// Mualliflar marshrutlari
app.use('/authors', authorRoutes);

// Himoyalangan marshrut
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Himoyalangan ma\'lumotlar', userId: req.user.userId });
});

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server ${PORT} portida ishlamoqda`);
});
