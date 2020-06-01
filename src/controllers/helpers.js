const { Book, Reader} = require ('../models');

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
    };
    return models[model];
}

const get404Error = (model) => ({error: `The ${model} could not be found.`});

const createItem = (res,model,item) => {
    const Model = getModel(model);

    return Model.create(item)
    .then((newItemCreated) => res.status(201).json(newItemCreated))
    .catch((error) => {
        const errorMessages = error.errors.map((e) => e.message);
        return res.status(400).json({errors: errorMessages});
    });
}

const getItems = (res,model) => {
    const Model = getModel(model);
    return Model.findAll().then((allItems) => {
        res.status(200).json(allItems);
    });
}
module.exports = { createItem, getItems }