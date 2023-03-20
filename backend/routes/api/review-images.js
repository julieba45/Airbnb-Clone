const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize, Sequelize } = require('../../db/models');
const { handleValidationErrors, handleNotFoundError } = require('../../utils/validation');
const router = express.Router();

let schema;
if(process.env.NODE_ENV === 'production'){
    schema = process.env.SCHEMA;
}

router.delete('/:imageId', requireAuth, async(req, res) => {
    const imageId = req.params.imageId
    const userId = req.user.id

    const reviewImage = await ReviewImage.findByPk(imageId)

    if(!reviewImage){
        return handleNotFoundError(res, "Review Image couldn't be found")
    }

    //check if the reviewimage belongs to the current user
    const review = await Review.findByPk(reviewImage.reviewId)
    if(userId === review.userId){
        await reviewImage.destroy()
    }
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })

})
module.exports = router;
