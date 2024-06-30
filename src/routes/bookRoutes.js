const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get('/', BookController.checkBookStock);

/**
 * @swagger
 * /books/check-stock:
 *   get:
 *     summary: Check available book stock
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of available books with quantities
 */
router.get('/check-stock', BookController.checkBookStock);

module.exports = router;
