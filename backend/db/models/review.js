'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId',  onDelete: 'CASCADE'});
      Review.belongsTo(models.User, {foreignKey: 'userId'});
      Review.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Review text is required',
        }
      }
    },
    stars:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stars must be an integer from 1 to 5'
        }
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
