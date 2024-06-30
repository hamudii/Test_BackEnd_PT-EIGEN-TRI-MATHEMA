const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.checkBookStock = async (req, res) => {
  try {
    const books = await Book.find();
    const availableBooks = books.filter(book => book.stock > 0);
    // res.json(availableBooks);
    res.render('books.ejs', { availableBooks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.renderBooksPage = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.render('books.ejs', { books });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
