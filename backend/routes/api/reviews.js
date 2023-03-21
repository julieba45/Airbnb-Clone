const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize, Sequelize } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleNotFoundError } = require('../../utils/validation');


let schema;
if(process.env.NODE_ENV === 'production'){
    schema = process.env.SCHEMA;
}

class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}

const validateReviews = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

const setPreviewImage = (images) => {
    const previewImage = images.find((image) => image.preview);
    if(previewImage){
        return previewImage.url
    }
    return 'no spot preview image found'
}

const checkReviewExists = async (reviewId) => {
    const review = await Review.findByPk(reviewId)
    if(!review){
        throw {message: "Review couldn't be found", statusCode: 404}
    }
    return review
}

//Only the owner of the review is authorized to add an image
const checkReviewOwner = (review, userId) => {
    if(review.userId !== userId){
        throw {message: 'Unauthorized', statusCode: 403}
    }
    return true
}


const max_images = 10;

router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    try{
        const  reviewId  = req.params.reviewId;
        const { url } = req.body;
        const userId = req.user.id;

        const review = await checkReviewExists(reviewId);
        checkReviewOwner(review, userId)

        //Check if the review has less than 10 images
        const reviewimages = await ReviewImage.getReviewImages(reviewId);
        if(reviewimages.length >= max_images){
            return res.json({
                message: 'Maximum number of images for this resource was reached',
                statusCode: 403
            })
        }

        //Create a new image associated to the review
        const reviewimage = await ReviewImage.create({
            url,
            reviewId
        })
        return res.json({
            id:reviewimage.id,
            url:reviewimage.url
        })

    }catch(error){
        return res.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode
        })
    }

})

router.get('/current', requireAuth, async(req, res, next) => {
    const userId = req.user.id

    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },{
                model: Spot,
                attributes: {
                    exclude: ['description']
                },
                include: [
                    {model: SpotImage},
                ]
            },{
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    const reviewList = [];
    reviews.forEach(review => {
        const reviewJson = review.toJSON()
        console.log(reviewJson)
        reviewJson.Spot.previewImage = setPreviewImage(reviewJson.Spot.SpotImages)
        delete reviewJson.Spot.createdAt;
        delete reviewJson.Spot.updatedAt;
        delete reviewJson.Spot.description;
        delete reviewJson.Spot.SpotImages;
        reviewList.push(reviewJson)
    })
    res.json({Reviews: reviewList})
})

router.put('/:reviewId', requireAuth, validateReviews, async(req, res, next) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id
    const {review, stars} = req.body

    try{
        const checkreview = await checkReviewExists(reviewId)

        checkReviewOwner(checkreview, userId)
        // console.log('BEFORE FIND')
        const _review = await Review.findOne({
            where: {
                userId: userId,
                id: reviewId
            }
        })

        // if (_review.length === 0) {
        //     return handleNotFoundError(res, "Spot couldn't be found")
        // }

        await _review.update({
            review,
            stars
        })

        res.json({
            id: _review.id,
            userId: _review.userId,
            spotId: _review.spotId,
            review: _review.review,
            stars: _review.stars,
            createdAt: _review.createdAt,
            updatedAt: _review.updatedAt,
        })
    }catch(err){
        handleNotFoundError(res, "Review couldn't be found")
    }

})

router.delete('/:reviewId', requireAuth, async(req, res) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id

    //if the review belongs to the user
    const review = await Review.findByPk(reviewId)
    if(!review){
        return handleNotFoundError(res, "Review couldn't be found")
    }
    if(review.userId === userId){
        await review.destroy()
    }
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})

module.exports = router;
