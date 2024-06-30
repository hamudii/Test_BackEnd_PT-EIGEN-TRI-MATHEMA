const Member = require('../models/Member');
const Book = require('../models/Book');

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('borrowedBooks');
    res.render('members.ejs', { members });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  const { bookCode } = req.params;
  const { memberCode } = req.body;

  try {
    const member = await Member.findOne({ code: memberCode }).populate('borrowedBooks');
    if (!member) return res.status(400).json({ message: 'Member not found' });

    if (member.penaltyUntil && new Date() < new Date(member.penaltyUntil)) {
      return res.status(400).json({ message: 'Member is penalized and cannot borrow books' });
    }

    if (member.borrowedBooks.length >= 2) {
      return res.status(400).json({ message: 'Member cannot borrow more than 2 books' });
    }

    const book = await Book.findOne({ code: bookCode });
    if (!book || book.stock <= 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Tanggal saat buku dipinjam
    const borrowDate = new Date();
    
    book.stock -= 1;
    book.borrowDate = borrowDate;
    member.borrowedBooks.push(book.code);
    await book.save();
    await member.save();

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.renderBorrowBook = async (req, res) => {
  const { bookCode } = req.params;
  try {
    res.render('borrowBooks', { bookCode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.renderReturnBook = async (req, res) => {
  try {
    res.render('returnBooks');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { memberCode, bookCode } = req.body;
  
  try {
    const member = await Member.findOne({ code: memberCode }).populate('borrowedBooks');
    if (!member) return res.status(400).json({ message: 'Member not found' });

    // Cari buku berdasarkan _id
    const findBook = member.borrowedBooks.find(bookCodeBorrowed => bookCodeBorrowed === bookCode);
    if (!findBook) {
      return res.status(400).json({ message: 'Book not borrowed by this member' });
    }

    const book = await Book.findOne({ code: bookCode });

    const borrowDate = book.borrowDate; // Ambil tanggal pinjam dari buku

    const daysBorrowed = (new Date() - new Date(borrowDate)) / (1000 * 60 * 60 * 24);
    if (daysBorrowed > 7) {
      member.penaltyUntil = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000); // Dikenakan denda selama 3 hari
    }

    // Hapus buku dari borrowedBooks
    member.borrowedBooks = member.borrowedBooks.filter(b => b !== bookCode);
    book.stock += 1; // Tambahkan stok buku

    await book.save();
    await member.save();

    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

