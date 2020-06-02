const { Book, Reader } = require ('../models');

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
    };
    return models[model];
}

const removePassword = (obj) => {
    if (obj.hasOwnProperty('password'))
    delete obj.password;

    return obj;
}

const get404Error = (model) => ({error: `The ${model} could not be found.`});

const createItems = (res,model,newInfo) => {
    const Model = getModel(model);

    return Model.create(newInfo)
    .then((newItemCreated) => {
        const itemsWithoutPassword = removePassword(newItemCreated.dataValues);
        res.status(200).json(itemsWithoutPassword);
    })
    .catch((error) => {
        const errorMessages = error.errors.map((e) => e.message);
        return res.status(400).json({errors: errorMessages}); //
    });
}

const getItems = (res,model) => {
    const Model = getModel(model);

    return Model.findAll().then((allItems) => {
        const itemsWithoutPassword = allItems.map((items) =>
        removePassword(items.dataValues));

        res.status(200).json(itemsWithoutPassword);
    });
}

const updateItems = (res, model, newInfo, id) => {
    const Model = getModel(model);

    return Model.update(newInfo, {where: {id}} )
    .then(([recordsUpdated]) => {
        if (!recordsUpdated) 
          res.status(404).json(get404Error(model));
       else 
        Model.findByPk(id).then((updatedItem) => {
            const itemsWithoutPassword = removePassword(updatedItem.dataValues);
            res.status(200).json(itemsWithoutPassword);
      })
    })
}
const getItemsByID = (res, model, id) => {
    const Model = getModel(model);

    return Model.findByPk(id).then(item => {
        if (!item) {
          res.status(404).json(get404Error(model));
        } else {
            const itemsWithoutPassword = removePassword(item.dataValues);
          res.status(200).json(itemsWithoutPassword);
        }
    });
}
const deleteItems = (res, model, id) => {
    const Model = getModel(model);

    return Model.findByPk(id).then(toDelete => {
        if(!toDelete) {
            res.status(404).json(get404Error(model));
        }
        else {
            Model.destroy({ where : { id } })
            .then(() => 
            {
                res.status(204).send();
            })
        }
    })
}
module.exports = { createItems, getItems, updateItems , getItemsByID, deleteItems }