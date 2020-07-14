const mongoose = require("mongoose");
const config = require('../config/config.js')
const Schema = mongoose.Schema;


const userSchema = Schema({
  fullName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  photo: {
    type: String,
    default: null,
  },
  posts: [
    { type: Schema.Types.ObjectId, ref: 'Post' }
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;