module.exports = (sequelize, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull: true,
                notEmpty: true, //checks for empty string
            }
        }
    }
       
    return sequelize.define('Author', schema);

};