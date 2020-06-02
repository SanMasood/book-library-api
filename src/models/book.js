module.exports = (sequelize, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true
            }

        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: true
            }
        },
        genre: DataTypes.STRING, 
        ISBN: DataTypes.STRING,
        };
    return sequelize.define('Book', schema);

};