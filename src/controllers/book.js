const {Book} = require('../models');

/*const getBooks = (_, res) => {
    Book.findAll().then(books => {
      res.status(200).json(books);
    });
}*/
const createBook = (req,res) => {
    //const newBook = req.body;
    Book.create(req.body)
    .then(newBookCreated => res.status(200).json(newBookCreated))
}

module.exports = {createBook};