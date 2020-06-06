module.exports = (sequelize, DataTypes) => {
    const schema = {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            //must be unique?
            validate:{
                notNull: true
            }
        }
    }
       
    return sequelize.define('Author', schema);

};