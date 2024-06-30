const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 */
router.get('/', MemberController.getAllMembers);

/**
 * @swagger
 * /members/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error borrowing book
 */
router.post('/borrow/:bookCode', MemberController.borrowBook);

/**
 * @swagger
 * /members/return:
 *   post:
 *     summary: Return a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Error returning book
 */
router.post('/return', MemberController.returnBook);
router.get('/getReturn', MemberController.renderReturnBook);
router.get('/getborrow/:bookCode', MemberController.renderBorrowBook);

module.exports = router;
