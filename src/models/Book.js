const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, required: true },
  borrowDate: { type: Date, default: null }
});

module.exports = mongoose.model('Book', bookSchema);