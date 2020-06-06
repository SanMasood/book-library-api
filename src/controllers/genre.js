const {getItems, createItems, updateItems, getItemsByID, deleteItems} = require('./helpers');

const getGenre = (req, res) => getItems(res, 'genre');

const createGenre = (req,res) => createItems (res, 'genre', req.body);

const updateGenre = (req,res) => updateItems (res, 'genre', req.body, req.params.id );

const getGenreById = (req,res) => getItemsByID(res, 'genre', req.params.id);

const deleteGenre = (req,res) => deleteItems(res, 'genre', req.params.id);

module.exports = { getGenre, createGenre, updateGenre, getGenreById, deleteGenre };