const fs = require('fs');

// Postlar olish
function getPosts() {
  const data = fs.readFileSync('db.json');
  const posts = JSON.parse(data).posts;
  return posts;
}

// Post qo'shish
function addPost(author, content) {
  const posts = getPosts();
  posts.push({ author, content, date: new Date().toISOString() });
  fs.writeFileSync('db.json', JSON.stringify({ users: getUsers(), posts }));
}

module.exports = { getPosts, addPost };
