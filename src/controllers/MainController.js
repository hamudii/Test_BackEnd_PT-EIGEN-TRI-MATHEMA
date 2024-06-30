const Member = require('../models/Member');
const Book = require('../models/Book');

exports.renderMain = async (req, res) => {
    try {
      const members = await Member.find();
      const books = await Book.find();
      res.render('index.ejs', { members, books });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};