module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      validate : {
        notNull: {
          args: [true],
          msg: 'Reader name cannot be null',
      },
      notEmpty: {
          args: [true],
          msg : 'Reader name canont be empty',
      },
    },
  },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { 
          args: [true],
          msg: 'Invalid email address',
        },
        notNull: {
        args: [true],
        msg : 'Email cannot be empty'
      },
      },
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args : [true],
          msg: 'Password cannot be empty',
        },
         isLessThan8Characters(value) {
          if (value.length < 8)
            throw new Error('Password needs to be longer than 8 characters');
      },
    },
  },
};

  return sequelize.define('Reader', schema);
};