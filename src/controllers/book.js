const {Book} = require('../models');
//const { Op } = require('sequelize');

const {getItems, createItems, updateItems, getItemsByID, deleteItems} = require('./helpers');
/*const createBook = (req,res) => {
    Book.create(req.body)
    .then(newBookCreated => res.status(200).json(newBookCreated))
}*/
const createBook = (req,res) => createItems(res, 'book', req.body);

/*const getAllBooks = (_, res) => {
    Book.findAll().then(books => {
      res.status(200).json(books);
    });
}*/

const getAllBooks = (req, res) => getItems (res, 'book');

/*const getBookByID = (req,res) => {
  const { id } = req.params;

  Book.findByPk(id).then((book) => {
    if (!book) {
      res.status(404).json({ error: 'The book could not be found.' });
    } else {
      res.status(200).json(book);
    }
  });
}*/
const getBookByID = (req,res) => getItemsByID (res, 'book', req.params.id);


  //Book.findByPk(title).then( user => {
    /*Book.findAll({ 
      where: { 
       title: { [Op.like]: `%${title}%`}   }  
    })
    .then(books => {
      if (!books)
      res.status(404).json({ error: 'No such book title found.' });
       else res.status(200).json(books);
      })*/
  
 /*const updateBook = (req, res) => {
   const { id } = req.params;
   const newDetails = req.body;
  
    Book
      .update(newDetails, { where: { id } })
      .then(([recordsUpdated]) => {
        if (recordsUpdated.length) {
          res.status(404).json({ error: 'The book could not be found.' });
      } else {
        Book.findByPk(id).then((updatedBook) => {
          res.status(200).json(updatedBook);
      })
    }
  });
}*/
const updateBook = (req,res) => updateItems(res, 'book', req.body, req.params.id);

/*const deleteBook = (req, res) => {
  const { id } = req.params;

  Book
    .findByPk(id)
    .then(foundBook => {
      if (!foundBook) {
        res.status(404).json({ error: 'The book could not be found.' });
      } else {
        Book
          .destroy({ where: { id } })
          .then(() => {
            res.status(204).send();
        });
    }
  });
}*/
const deleteBook = (req,res) => deleteItems(res, 'book', req.params.id);

module.exports = {createBook, getAllBooks, getBookByID, updateBook, deleteBook};
