'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.belongsToMany(models.villager, {through: 'usersVillagers'})
    }
  };

  user.prototype.validPassword = function(typedInPassword) {
    let correctPassword = bcrypt.compareSync(typedInPassword, this.password)
    return correctPassword
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [1, 255],
          msg: 'Please enter a valid username.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 25],
          msg: 'Your password must be between 6 and 25 characters.'
        }
      }
    },
    photo: DataTypes.STRING,
    about: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: pendingUser => {
        if(pendingUser && pendingUser.password){
          let hashedPassword = bcrypt.hashSync(pendingUser.password, 12)
          pendingUser.password = hashedPassword
        }
      }
    }
  });
  return user;
};