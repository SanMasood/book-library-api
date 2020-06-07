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
        /*author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull: {
                    args: [true],
                    msg: 'Author needs a name.'
                },
                notEmpty: {
                    args: [true],
                    msg: 'Author name cannot be empty'
                },
            },
        },*/
        //genre: DataTypes.STRING, 
        ISBN: DataTypes.STRING,
        };
    return sequelize.define('Book', schema);

};