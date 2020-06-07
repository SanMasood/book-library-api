module.exports = (sequelize, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull: {
                    args: [true],
                    msg: 'Author name cannot be null',
                },
                notEmpty: {
                    args: [true],
                    msg : 'Author name canont be empty',
                }, 
            }
        }
    }
       
    return sequelize.define('Author', schema);

};