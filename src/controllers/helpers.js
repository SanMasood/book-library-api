const { Book, Reader, Author, Genre } = require ('../models');

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
        author: Author,
        genre: Genre,
    };
    return models[model]; 
}

const removePassword = (obj) => {
    if (obj.hasOwnProperty('password'))
    delete obj.password;

    return obj;
}

const get404Error = (model) => ({error: `The ${model} could not be found.`});

const getOptions = (model) => {
    if (model === 'book') return { include: [{ model: Genre }, { model: Author }] };
    if (model === 'genre' || model === 'author' ) return { include: Book };   
  
    return {};
  };
  
  // Helper functions to be exported
  
  const getItems = (res, model) => {
    const Model = getModel(model);
    const options = getOptions(model);
  
    Model.findAll({ ...options }).then((items) => {
      const itemsWithoutPassword = items.map((item) =>
        removePassword(item.dataValues)
      );
      res.status(200).json(itemsWithoutPassword);
    });
  };
  
  const createItems = (res, model, item) => {
    const Model = getModel(model);
  
    Model.create(item)
      .then((newItemCreated) => {
        const itemWithoutPassword = removePassword(newItemCreated.dataValues);
        res.status(200).json(itemWithoutPassword);
      })
      .catch((error) => {
        const errorMessages = error.errors.map((e) => e.message);
        res.status(400).json({ errors: errorMessages });
      });
  };
  
  const updateItems = (res, model, item, id) => {
    const Model = getModel(model);
  
    Model.update(item, { where: { id } })
      .then(([fieldsUpdated]) => {
        if (!fieldsUpdated) {
          res.status(404).json(get404Error(model));
        } else {
          Model.findByPk(id).then((updatedItem) => {
            const itemWithoutPassword = removePassword(updatedItem.dataValues);
            res.status(200).json(itemWithoutPassword);
          });
        }
      })
      .catch((error) => {
        const errorMessages = error.errors.map((e) => e.message);
        res.status(400).json({ errors: errorMessages });
      });
  };
  
  const getItemsByID = (res, model, id) => {
    const Model = getModel(model);
    const options = getOptions(model);
  
    Model.findByPk(id, { ...options }).then((item) => {
      if (!item) {
        res.status(404).json(get404Error(model));
      } else {
        const itemWithoutPassword = removePassword(item.dataValues);
        res.status(200).json(itemWithoutPassword);
      }
    });
  };
  
  const deleteItems = (res, model, id) => {
    const Model = getModel(model);
  
    Model.findByPk(id).then((foundItem) => {
      if (!foundItem) {
        res.status(404).json(get404Error(model));
      } else {
        Model.destroy({ where: { id } }).then(() => {
          res.status(200).send();
        });
      }
    });
  };
  
  module.exports = {
    getItems,
    createItems,
    updateItems,
    getItemsByID,
    deleteItems,
  };
