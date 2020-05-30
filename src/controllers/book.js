const {Book} = require('../models');
const { Op } = require("sequelize");


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

const getBookByTitle = async (req,res) => {
  const { title } = req.params;

  Book.findAll({ 
    where: { 
     title: { [Op.like]: `%${title}%`}   }
  
  })
  .then(books => res.status(200).json(books));

  }



module.exports = {createBook, getAllBooks, getBookByTitle};
