const { getPosts, addPost } = require('./post');

// Postlar ro'yxatini olish
app.get('/posts', (req, res) => {
  const posts = getPosts();
  res.json(posts);
});

// Yangi post qo'shish
app.post('/posts', (req, res) => {
  const token = req.headers['authorization'];
  const user = authenticateToken(token);
  if (!user) {
    return res.status(403).json({ message: 'Noto‘g‘ri token' });
  }

  const { content } = req.body;
  addPost(user.username, content);
  res.status(201).json({ message: 'Post qo\'shildi' });
});
