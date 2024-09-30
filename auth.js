const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret_key';

// Foydalanuvchilarni JSON faylidan o'qish
function getUsers() {
  const data = fs.readFileSync('db.json');
  const users = JSON.parse(data).users;
  return users;
}

// Foydalanuvchini qo'shish
function addUser(username, password) {
  const users = getUsers();
  const hashedPassword = bcrypt.hashSync(password, 10);

  users.push({ username, password: hashedPassword });
  fs.writeFileSync('db.json', JSON.stringify({ users }));
}

// Ro'yxatdan o'tish
function register(username, password) {
  const users = getUsers();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return { error: 'Foydalanuvchi allaqachon mavjud' };
  }

  addUser(username, password);
  return { message: 'Ro\'yxatdan o\'tish muvaffaqiyatli' };
}

// Kirish
function login(username, password) {
  const users = getUsers();
  const user = users.find(user => user.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return { error: 'Noto\'g\'ri foydalanuvchi yoki parol' };
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
}

// Tokenni tekshirish
function authenticateToken(token) {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch {
    return null;
  }
}

module.exports = { register, login, authenticateToken };
