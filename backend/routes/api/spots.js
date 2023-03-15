const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, sequelize, Sequelize } = require('../../db/models');
const router = express.Router();
// const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

let schema;
if(process.env.NODE_ENV === 'production'){
    schema = process.env.SCHEMA;
}

// GET All Spots /api/spots (sqlite)
// router.get('/', async (req, res) =>{
//     const finderSpots = await Spot.findSpots({
//         include: [
//             {
//                 model: Review,
//                 attributes: []
//             },
//             {
//                 model: SpotImage,
//                 attributes: []
//             }
//         ],
//     })
//     const avg = finderSpots.map(spot =>
//       spot.getAverageRating())
//     return res.json({finderSpots, avg})
// }
// );


// // // GET All Spots /api/spots
// router.get('/', async (req, res) =>{
//     const spot = await Spot.findAll({
//         //raw: true,
//         attributes: {
//         },
//         include: [{
//             model: SpotImage,
//             attributes: []
//         }, {
//             model: Review,
//             attributes: {
//                 include: [
//                     [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
//                     //[Sequelize.col("SpotImages.url"), "previewImage"],
//                     [
//                         Sequelize.literal(
//                         `(SELECT url FROM ${
//                             schema ? `"${schema}"."SpotImages"` : 'SpotImages'
//                         } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 5)`
//                         ),
//                         'previewImage',
//                     ],
//                 ],

//             },
//         }],
//       })
//       console.log(spot)
//       return res.json(spot)
//     }
// );



router.get('/', async (req, res) =>{
    const spots = await Spot.findAll({
        // review: review.getAverageRating(),
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage,
            }
        ]
    })
    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if(image.preview === true){
                spot.preview = image.url
            }
        })
        if(!spot.preview){
            spot.preview = 'no spot preview image found'
        }
        delete spot.SpotImages
    })

    spotList.forEach(spot => {
        let sum = 0
        spot.Reviews.forEach(rev => {
            sum += rev.stars
        })
        spot.AvgRating = sum/spot.Reviews.length
        delete spot.Reviews
    })

    res.json(spotList)

})

router.post('/', requireAuth, async(req,res) => {
    const ownerId = req.user.userId;
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    try{
        const newSpot = await Spot.create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
    res.json(newSpot)

    } catch(err){
        if(err instanceof Sequelize.ValidationError){
            // console.log('HEREEEE',err.errors)
            const errors = {};
            err.errors.forEach((error) => {
                errors[error.path] = error.message;
            })
            console.log('HERE', errors)
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                errors
            })
        }
    }
})






module.exports = router;
