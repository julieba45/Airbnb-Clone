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

    static associate(models) {
      // define association here
      //A spot belongs to one owner(user)
      Spot.belongsTo(models.User, {foreignKey: 'owner_id', as: 'Owner'});

      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId'});

      Spot.hasMany(models.Review, { foreignKey: 'spotId'});

      Spot.hasMany(models.Booking, { foreignKey: 'spotId'})

    }
  }
  Spot.init({
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull:{
          msg:'Street Address is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'City is required'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'State is required'
        }
      }
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Country is required'
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Latitude is not valid'
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Longitude is not valid'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0,50],
          msg: 'Name must be less than 50 characters'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price per day is required'
        }
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
