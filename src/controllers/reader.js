//const { Reader } = require('../models');

const {getItems, createItems, updateItems, getItemsByID, deleteItems} = require('./helpers');

/*const getReaders = (_, res) => {
  Reader.findAll().then(readers => {
    res.status(200).json(readers);
  });
}*/
const getReaders = (req, res) => getItems(res, 'reader');

/*const createReader = (req, res) => {
  const newReader = req.body;
  Reader.create(newReader).then(newReaderCreated => res.status(201).json(newReaderCreated));
}*/
const createReader = (req,res) => createItems (res, 'reader', req.body);

/*const updateReader = (req, res) => {
  const { id } = req.params;
  const newDetails = req.body;
  Reader
    .update(newDetails, { where: { id } })
    .then(([recordsUpdated]) => {
      if (!recordsUpdated) {
        res.status(404).json({ error: 'The reader could not be found.' });
    } else {
      Reader.findByPk(id).then((updatedReader) => {
        res
        .status(200)
        .json(updatedReader);
    }
      )}
  });
}*/
const updateReader = (req,res) => updateItems (res, 'reader', req.body, req.params.id );

/*const getReaderById = (req, res) => {
  const { id } = req.params;
  Reader.findByPk(id).then(reader => {
    if (!reader) {
      res
        .status(404)
        .json({ error: 'The reader could not be found.' });
    } else {
      res
        .status(200)
        .json(reader);
    }
  });
}*/
const getReaderById = (req,res) => getItemsByID(res, 'reader', req.params.id);

const deleteReader = (req,res) => deleteItems(res, 'reader', req.params.id);

/*const deleteReader = (req, res) => {
  const { id } = req.params;
  Reader
    .findByPk(id)
    .then(foundReader => {
      if (!foundReader) {
        res.status(404).json({ error: 'The reader could not be found.' });
      } else {
        Reader
          .destroy({ where: { id } })
          .then(() => {
            res.status(204).send();
        });
    }
  });
}*/

module.exports = {
  getReaders,
  getReaderById,
  createReader,
  updateReader,
  deleteReader
}