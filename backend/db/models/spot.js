'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //A spot belongs to one owner(user)
      Spot.belongsTo(models.User, {foreignKey: 'owner_id'});

      //Spot.hasMany(models.SpotImage, { foreignKey: 'spotId'});

      Spot.hasMany(models.Review, { foreignKey: 'spotId'});

      Spot.hasMany(models.Booking, { foreignKey: 'spotId'})

    }
  }
  Spot.init({
    owner_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
