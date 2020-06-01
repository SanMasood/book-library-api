const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookByID);
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);



module.exports = router;