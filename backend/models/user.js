const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations with other models later
    }

    // Add the findAll method here
    static async findAll() {
      try {
        const users = await User.findAll(); // Use the built-in findAll method
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        return []; // Return an empty array if an error occurs
      }
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', bcrypt.hash(value, 10));
      },
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
