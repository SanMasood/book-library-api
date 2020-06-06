const {getItems, createItems, updateItems, getItemsByID, deleteItems} = require('./helpers');

const getAuthor = (req, res) => getItems(res, 'author');

const createAuthor = (req,res) => createItems (res, 'author', req.body);

const updateAuthor = (req,res) => updateItems (res, 'author', req.body, req.params.id );

const getAuthorById = (req,res) => getItemsByID(res, 'author', req.params.id);

const deleteAuthor = (req,res) => deleteItems(res, 'author', req.params.id);

module.exports = { getAuthor, createAuthor, updateAuthor, getAuthorById, deleteAuthor };
