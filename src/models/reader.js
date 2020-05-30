module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
      }
      
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true,
        min: 8
      }
    },
  };

  return sequelize.define('Reader', schema);
};
