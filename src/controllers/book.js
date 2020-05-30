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

  Book.findByPk(title).then( user => {
    Book.findAll({ 
      where: { 
       title: { [Op.like]: `%${title}%`}   }  
    })
    .then(books => {
      if (!books)
      res.status(404).json({ error: 'No such book title found.' });
       else res.status(200).json(books);
      });
    })
  }
    
    /*Book.findAll({ 
      where: { 
       title: { [Op.like]: `%${title}%`}   }  
    })
    .then((books) => {
      if (!books) //dont get this.
        res.status(404).json({ error: 'The artist could not be found.' });
       else 
        res.status(200).json(books);     

  })
})*/


 


module.exports = {createBook, getAllBooks, getBookByTitle};
