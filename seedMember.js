const mongoose = require('mongoose');
const Member = require('./src/models/Member');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testEIGEN', { useNewUrlParser: true, useUnifiedTopology: true });

const members = [
    {
        code: "M001",
        name: "Angga",
    },
    {
        code: "M002",
        name: "Ferry",
    },
    {
        code: "M003",
        name: "Putri",
    },
];

// Function to seed members into the database
const seedMember = async () => {
  try {
    await Member.insertMany(members);
    console.log('Member have been successfully seeded');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding members:', err);
    mongoose.connection.close();
  }
};

seedMember();
