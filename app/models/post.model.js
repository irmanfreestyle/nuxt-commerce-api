const mongoose = require("mongoose");
const config = require('../config/config.js');
const Schema = mongoose.Schema;

const postSchema = Schema({
  author: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  location: {
    type: String,
    required: true,
    maxlength: 50,
  },
  condition: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  photos: [{
    cover : Boolean,
    file : String
  }],
  showPhone: Boolean,
  likes: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],
  createdAt: {
    type: Number,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;