const mongoose = require('mongoose');
const Book = require('./src/models/Book');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testEIGEN', { useNewUrlParser: true, useUnifiedTopology: true });

const books = [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    }
];

// Function to seed books into the database
const seedBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log('Books have been successfully seeded');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding books:', err);
    mongoose.connection.close();
  }
};

seedBooks();
