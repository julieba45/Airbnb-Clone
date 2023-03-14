const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, sequelize } = require('../../db/models');
const router = express.Router();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// GET All Spots /api/spots
router.get('/', async (req, res) =>{
    const spot = await Spot.findAll({
        // raw: true,
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        include: [{
            model: Review,
            attributes: []
        }, {
            model: SpotImage,
            attributes: ['url'],
            limit: 1
        }],
      })
      return res.json({Spots: spot})
    }
);

module.exports = router;
