const express = require('express');
const Author = require('../models/Author');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Muallif yaratish
router.post('/', authMiddleware, async (req, res) => {
    const { name, bio } = req.body;
    const author = new Author({ name, bio });

    try {
        await author.save();
        res.status(201).json({ message: 'Muallif muvaffaqiyatli yaratildi', author });
    } catch (error) {
        res.status(400).json({ message: 'Muallif yaratishda xato' });
    }
});

// Mualliflarni olish
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Mualliflarni olishda xato' });
    }
});

// Muallifni ID bo‘yicha olish
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: 'Muallif topilmadi' });
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: 'Muallifni olishda xato' });
    }
});

// Muallifni yangilash
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

    try {
        const author = await Author.findByIdAndUpdate(id, { name, bio }, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Muallif topilmadi' });
        }
        res.json({ message: 'Muallif yangilandi', author });
    } catch (error) {
        res.status(400).json({ message: 'Muallifni yangilashda xato' });
    }
});

// Muallifni o‘chirish
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Author.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({ message: 'Muallif topilmadi' });
        }
        res.json({ message: 'Muallif o‘chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Muallifni o‘chirishda xato' });
    }
});

module.exports = router;
