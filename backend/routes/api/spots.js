const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize, Sequelize } = require('../../db/models');
const router = express.Router();
// const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { query } = require('express-validator')
const { check } = require('express-validator');
const { body } = require('express-validator');
const { handleValidationErrors, handleSequelizeValidationError, handleNotFoundError, validateStartDate, validateEndDate } = require('../../utils/validation');

let schema;
if(process.env.NODE_ENV === 'production'){
    schema = process.env.SCHEMA;
}

const validateSpots = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

  const validateSpotImages = [
    check('url')
      .exists({ checkFalsy: true })
      .withMessage('Image URL is required'),
    check('preview')
      .isBoolean()
      .withMessage('Preview must be a boolean value'),
    handleValidationErrors
  ];

  const validateBookingDates = [
    body('startDate')
        .exists({checkFalsy: true})
        .withMessage('Start Date is required')
        .isISO8601()
        .withMessage('Start date must have valid date format (YYYY-MM-DD)'),
    body('endDate')
        .exists({checkFalsy: true})
        .withMessage('End date is required')
        .isISO8601()
        .withMessage('End date must have valid date formate (YYYY-MM-DD)')
        .custom((endDate, { req }) => {
            const startDate = req.body.startDate
            if(new Date(startDate) >= new Date(endDate)){
                throw new Error('End date must be on or before start date')
            }
            return true
        }),
    handleValidationErrors
  ]

  const validateReviews = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

  const validateQueryParams = [
    query('page')
        .optional()
        .isInt({min: 1, max: 10})
        .withMessage('Page must be greater than or equal to 1'),
    query('size')
        .optional()
        .isInt({min: 1, max: 20})
        .withMessage('Size must be greater than or equal to 1'),
    query('maxLat').optional().isDecimal().withMessage("Maximum latitude is invalid"),
    query('minLat').optional().isDecimal().withMessage("Minimum latitude is invalid"),
    query('minLng').optional().isDecimal().withMessage("Minimum longitude is invalid"),
    query('maxLng').optional().isDecimal().withMessage("Maximum longitude is invalid"),
    query('minPrice').optional().isDecimal({min: 0}).withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice').optional().isDecimal({min: 0}).withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
  ]


const calculateAverageRating = (reviews) => {
    const sum = reviews.reduce((acc, rev) => acc + rev.stars, 0)
    const avgRating = sum /reviews.length
    return avgRating || "no reviews";
}

const setPreviewImage = (images) => {
    const previewImage = images.find((image) => image.preview);
    if(previewImage){
        return previewImage.url
    }
    return 'no spot preview image found'
}
//Get all Spots (/api/spots?page=1&size=20)
router.get('/', validateQueryParams, async(req, res)=> {
    console.log('-----------IM IN MY ROUTE FOR GET ALL SPOTS--------')
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;
    const offset = (page -1) * size;
    const filtered = {}
    if(req.query.minLat && req.query.maxLat){
        filtered.lat = {[Op.between]: [req.query.minLat, req.query.maxLat] }
        console.log('1')
    }
    if(req.query.minLng && req.query.maxLng){
        filtered.lng = {[Op.between]: [req.query.minLng, req.query.maxLng]}
        console.log('2')
    }
    if(req.query.minPrice){
        filtered.price = {[Op.gte]: req.query.minPrice}
        console.log('3')
    }
    if(req.query.maxPrice){
        filtered.price = {...filtered.price, [Op.lte]: req.query.maxPrice}
        console.log('4')
    }

    const spots = await Spot.findAll({
        where: filtered,
        offset,
        limit: size,
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage,
            }
        ]
    })

    const spotList = [];
    spots.forEach(spot => {
        const spotJson = spot.toJSON()
        // console.log('HEREEEE!!!!', spotJson)
        spotJson.previewImage = setPreviewImage(spotJson.SpotImages)
        delete spotJson.SpotImages;

        spotJson.avgRating = calculateAverageRating(spotJson.Reviews)
        delete spotJson.Reviews;

        spotList.push(spotJson)
    })

    res.status(200).json({
        Spots: spotList,
        page: page,
        size: size
    })
  })

router.post('/', requireAuth, validateSpots, async(req,res) => {
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
        handleSequelizeValidationError(err, res)
    }
})



router.post('/:spotId/images', requireAuth, validateSpotImages, async(req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { url, preview } = req.body;

    const spot = await Spot.findOne({ where: { id: spotId } });
    if (!spot) {
        return handleNotFoundError(res, "Spot couldn't be found")
    }

    if(spot.owner_id !== userId){
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    try{
        const newSpotImage = await SpotImage.create(
            {
                spotId, url, preview: !!preview
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
    } catch(err){
        handleSequelizeValidationError(err, res)
    }
  });


  ////////////////////////////////DONT FORGET TO REFACTOR THESE THEY ARE MESSSSYYY!!!!
  //Get all Spots owned by the Current User
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
  //Get details of a Spot from an id
  router.get('/:spotId', async(req, res) => {
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

//Edit a Spot
  router.put('/:spotId', validateSpots, requireAuth, async(req, res) => {
    const userId = req.user.id
    const spotId = req.params.spotId
    const {address, city, state, country, lat, lng, name, description, price } = req.body;

    //Ensure authenticated user is the owner of the spot
    try{
    const spot = await Spot.findOne({
        where: {
            id: spotId,
        }
    })

    //Couldn't find a Spot with the specified id
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    //Spot must belong to the current user
    if(spot.owner_id !==userId){
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }
    await spot.update({
        address, city, state, country, lat, lng, name, description, price
    })

    res.json({
        id: spot.id,
        ownerId: spot.owner_id,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,

    })
    }catch(err){
        handleSequelizeValidationError(err, res)
    }

  })

  //Create a Review for a Spot based on the Spot's id
  router.post('/:spotId/reviews', requireAuth, validateReviews, async(req, res, next) => {

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
        handleSequelizeValidationError(err, res)
    }

  })

  ////////////////////////////////////////////////////////////////////////////////

  //Get all Reviews by a Spot's id
  router.get('/:spotId/reviews', async(req,res) => {
    const spotId = req.params.spotId;
        const reviews = await Review.findAll({
            where: {spotId},
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })
        if (reviews.length === 0) {
            return handleNotFoundError(res, "Spot couldn't be found")
        }
        res.json({
            Reviews: reviews
        })
  })

  //Create a Booking from a Spot based on the Spot's id
  router.post('/:spotId/bookings', requireAuth, validateBookingDates, async(req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const { startDate, endDate } = req.body

    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return handleNotFoundError(res, "Spot couldn't be found")
    }

    //check if the user does not own the spot
    if(spot.owner_id === userId){
        return res.status(400).json({
            message: 'You cannot book your own place',
            statusCode: 400,
        })
    }

    // Check booking conflict
    const startconflict = await validateStartDate(spotId, startDate);
    const endconflict = await validateEndDate(spotId, endDate);
    console.log("START CHECKING")
    if((startconflict==true)|| (endconflict==true)){
        console.log('THERE IS A CONFLICT')
        let errmsg = {}
        if (startconflict){
            console.log('START DATE IS WRONG')
            errmsg['startDate'] = "Start date conflicts with an existing booking"
        }

        if (endconflict){
            errmsg['endDate'] = "End date conflicts with an existing booking"
        }

        return res.status(403).json({
            message: 'Sorry, this spot is already booked for the specified dates',
            statusCode: 403,
            errmsg
        })
    }


    const booking = await Booking.create({ spotId, userId, startDate, endDate })

    res.status(200).json({
        id: booking.id,
        spotId: Number(booking.spotId),
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
    })
  })

  router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return handleNotFoundError(res, "Spot couldn't be found")
    }
    //Checking based on whether the user is the  Owner of the Spot
    const isOwner = spot.owner_id === userId

    let bookings
    console.log(isOwner, spot.owner_id, userId, 'FLAD')
    if(isOwner){
        bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] }
            ]
        })
    } else {
        bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'id', 'userId']
            }
        })
    }

    const bookingList = [];
    bookings.forEach(booking => {
        const bookingJson = booking.toJSON()
        console.log('FLAG', bookingJson)

        bookingList.push(bookingJson)
    })
    res.json({
        Bookings: bookingList
    })
  })

  router.delete('/:spotId', requireAuth, async(req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id

    //if the spot belongs to the user
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        return handleNotFoundError(res, "Spot couldn't be found")
    }

    if(spot.owner_id !== userId){
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    await spot.destroy()
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
  })



module.exports = router;
