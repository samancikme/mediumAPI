// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Bu yerda User modeliga bog'layapmiz
    required: true
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
