const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  borrowedBooks: [{ type: String, required: true }],
  penaltyUntil: { type: Date, default: null }
});

module.exports = mongoose.model('Member', memberSchema);