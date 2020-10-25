'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class villager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      villager.belongsToMany(models.user, {through: 'usersVillagers'})
    }
  };
  villager.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    personality: DataTypes.STRING,
    apiId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'villager',
  });
  return villager;
};