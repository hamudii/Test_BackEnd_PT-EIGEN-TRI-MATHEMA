const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bookRoutes = require('./src/routes/bookRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/testEIGEN', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'], // files containing annotations for Swagger
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Routes
app.use('/', mainRoutes);
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});