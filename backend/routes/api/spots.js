const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, sequelize, Sequelize } = require('../../db/models');
const router = express.Router();
// const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

let schema;
if(process.env.NODE_ENV === 'production'){
    schema = process.env.SCHEMA;
}

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
        spot.avgRating = sum/spot.Reviews.length
        if(!spot.avgRating){
            spot.avgRating = 'no reviews'
        }
        delete spot.Reviews
    })

    res.json({Spots:spotList})

})

router.post('/', requireAuth, async(req,res) => {
    const ownerId = req.user.id;
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    try{
        const newSpot = await Spot.create({
            owner_id: ownerId,
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
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                errors
            })
        }
    }
})



router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { url, preview } = req.body;

    const spot = await Spot.findOne({ where: { id: spotId, owner_id: userId } });

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const newSpotImage = await SpotImage.create(
            {
                spotId, url, preview
            },
            {
                include: [{
                    model: Spot
                }]
            }
        );

    res.status(201).json({
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    });

  });

  router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id
    const spots = await Spot.findAll({
        where: {
            owner_id: userId
        },
        include: [{model: SpotImage}, {model: Review}]
    })
    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if(image.preview === true){
                spot.previewImage = image.url
            }
        })
        if(!spot.previewImage){
            spot.previewImage = 'no spot preview image found'
        }
        delete spot.SpotImages
    })

    spotList.forEach(spot => {
        let sum = 0
        spot.Reviews.forEach(rev => {
            sum += rev.stars
        })
        spot.avgRating = sum/spot.Reviews.length
        if(!spot.avgRating){
            spot.avgRating = 'no reviews'
        }
        delete spot.Reviews
    })

    res.json({Spots: spotList})
  })

  router.get('/:spotId', requireAuth, async(req, res) => {
    const spotId = req.params.spotId
    // console.log('here', spotId)
    const spots = await Spot.findAll({
        where: {
            id: spotId
        },
        include: [
            {
                model: SpotImage,
                attributes:['id', 'url', 'preview']
            },
            {
                model: Review
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName'],
              }
        ]
    })

    if(!spots || spots.length == 0){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    })

    spotList.forEach(spot => {
        let sum = 0
        spot.Reviews.forEach(rev => {
            sum += rev.stars
        })
        spot.avgStarRating = sum/spot.Reviews.length
        if(!spot.avgStarRating){
            spot.avgStarRating = 'no reviews'
        }
        spot.numReviews = sum
        delete spot.Reviews
    })

    res.json(spotList[0])
  })

  router.put('/:spotId', requireAuth, async(req, res) => {
    const userId = req.user.id
    const spotId = req.params.spotId
    const {address, city, state, country, lat, lng, name, description, price } = req.body;

    //Ensure authenticated user is the owner of the spot
    try{
    const spot = await Spot.findOne({
        where: {
            id: spotId,
            owner_id: userId
        }
    })

    //Couldn't find a Spot with the specified id
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    spot.address = address,
    spot.city = city,
    spot.state = state,
    spot.country = country,
    spot.lat = lat,
    spot.lng = lng,
    spot.name = name,
    spot.description = description,
    spot.price = price

    await spot.validate()

    res.json(spot)
    }catch(err){
        if(err instanceof Sequelize.ValidationError){
            // console.log('HEREEEE',err.errors)
            const errors = {};
            err.errors.forEach((error) => {
                errors[error.path] = error.message;
            })
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                errors
            })
        }
    }

  })

  router.post('/:spotId/reviews', requireAuth, async(req, res, next) => {

    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { review, stars } = req.body;
    try {
        const spot = await Spot.findOne({ where:{id: spotId,}})
        //Error response: Couldn't find a Spot with the specified id
        if(!spot){
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        }

        const existingReview = await Review.findOne({
            where: {
                spotId,
                userId
            }
        })
        //Error response: Review from the current user already exists for the Spot
        if(existingReview){
            return res.status(404).json({
                message: 'User already has a review for this spot',
                statusCode: 403
            })
        }

        const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
        })
        res.json(newReview)

    } catch(err){
        if(err instanceof Sequelize.ValidationError){
            const errors = {};
            err.errors.forEach((error) => {
                errors[error.path] = error.message;
            })
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                errors
            })
        }
    }

  })




module.exports = router;
