module.exports = (sequelize, DataTypes) => {
    const schema = {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notNull: {
                    args: [true],
                    msg: 'We need a genre so we can create one.',
                    
                },
                notEmpty: {
                    args: [true],
                    msg: 'We need a genre so we can create one.',
                },
            },
        },
       
    };
 return sequelize.define('Genre', schema);
}