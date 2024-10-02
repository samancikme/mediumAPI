// routes/posts.js
const express = require('express');
const Post = require('../models/Post')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Yangi post yaratish
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user.userId  // AuthMiddleware orqali foydalanuvchi ID olamiz
    });
    await post.save();
    res.status(201).json({ message: 'Post muvaffaqiyatli yaratildi', post });
  } catch (error) {
    res.status(500).json({ message: 'Post yaratishda xatolik', error });
  }
});

// Barcha postlarni olish
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Postlarni olishda xatolik', error });
  }
});

// Muallifning postlarini olish
router.get('/author/:authorId', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.authorId }).populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Muallifning postlarini olishda xatolik', error });
  }
});

module.exports = router;
