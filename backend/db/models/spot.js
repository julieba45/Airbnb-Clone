'use strict';
const {
  Model
} = require('sequelize');

const Review = require('./review');
const SpotImage = require('./spotimage');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static async getAverageRating(spotId){
    //   const reviews = await Review.findAll({
    //     where: {spotId},
    //     attributes: ['stars']
    //   })
    //   if(reviews.length === 0){
    //     return 0
    //   }
    //   const sum = reviews.reduce((total, review) => total + review.stars,0);
    //   // console.log(sum, sum/reviews.length)
    //   return sum /reviews.length
    // }

    static associate(models) {
      // define association here
      //A spot belongs to one owner(user)
      Spot.belongsTo(models.User, {foreignKey: 'owner_id'});

      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId'});

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
