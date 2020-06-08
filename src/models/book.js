module.exports = (sequelize, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    args: [true],
                    msg: 'Book needs a title',
                },
                notEmpty :{
                    args: [true],
                    msg: 'The book cannot be empty',

                },
            },
        },
         
        ISBN: DataTypes.STRING,
        };
    return sequelize.define('Book', schema);

};