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

const setPreviewImage = (images) => {
    const previewImage = images.find((image) => image.preview);
    if(previewImage){
        return previewImage.url
    }
    return 'no spot preview image found'
}

router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id

    const bookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Spot,
                attributes:{
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url']
                    }
                ]
            }
        ]
    })

    const bookingList = [];
    bookings.forEach(booking => {
        const bookingJson = booking.toJSON()

        bookingJson.Spot.previewImage = setPreviewImage(bookingJson.Spot.SpotImages)
        delete bookingJson.Spot.SpotImages
        bookingList.push(bookingJson)

    })
    res.json({Bookings: bookingList})
})







module.exports = router;
