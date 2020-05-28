const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:title', bookController.getBookByTitle);

module.exports = router;