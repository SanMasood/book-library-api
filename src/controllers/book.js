const {Book} = require('../models');


const createBook = (req,res) => {
    //const newBook = req.body;
    Book.create(req.body)
    .then(newBookCreated => res.status(200).json(newBookCreated))
}

const getAllBooks = (_, res) => {
    Book.findAll().then(books => {
      res.status(200).json(books);
    });
}

module.exports = {createBook, getAllBooks};