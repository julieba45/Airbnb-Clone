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

        const spotImage = await SpotImage.findByPk(imageId)

        if(!spotImage){
            return handleNotFoundError(res, "Spot Image couldn't be found")
        }

        //check if the spotimage belongs to current user
        const spot = await Spot.findByPk(spotImage.spotId)
        if(userId === spot.owner_id){
            await spotImage.destroy()
        }

    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})



module.exports = router;
