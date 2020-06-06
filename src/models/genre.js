module.exports = (sequelize, DataTypes) => {
    const schema = {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull: true
            }
        },
       
    };
 return sequelize.define('Genre', schema);
}