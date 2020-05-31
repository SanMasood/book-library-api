const {Book} = require('../models');
const { Op } = require('sequelize');


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

const getBookByTitle = (req,res) => {
  const { title } = req.params;

  //Book.findByPk(title).then( user => {
    Book.findAll({ 
      where: { 
       title: { [Op.like]: `%${title}%`}   }  
    })
    .then(books => {
      if (!books)
      res.status(404).json({ error: 'No such book title found.' });
       else res.status(200).json(books);
      })
  
  }

  const updateBook = (req, res) => {
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
}
const deleteBook = (req, res) => {
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
}
    
   
module.exports = {createBook, getAllBooks, getBookByTitle, updateBook, deleteBook};
