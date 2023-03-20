const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Booking, ReviewImage, sequelize, Sequelize } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { body } = require('express-validator');
const { handleValidationErrors, handleNotFoundError, validateStartDate, validateEndDate } = require('../../utils/validation');


let schema;
if(process.env.NODE_ENV === 'production'){
    schema = process.env.SCHEMA;
}

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
                throw new Error('endDate cannot come before startDate')
            }
            return true
        })
        .custom((endDate) => {
            const today = new Date().toJSON().slice(0,10)
            if(new Date(endDate) < new Date(today)){
                throw new Error("Past bookings can't be modified")
            }
            return true
        }),

    handleValidationErrors
  ]

const setPreviewImage = (images) => {
    const previewImage = images.find((image) => image.preview);
    if(previewImage){
        return previewImage.url
    }
    return 'no spot preview image found'
}

const checkBookingExists = async (bookingId) => {
    const booking = await Booking.findByPk(bookingId)
    if(!booking){
        throw {message: "Booking couldn't be found", statusCode: 404}
    }
    return booking
}

const checkBookingOwner = (booking, userId) => {
    if(booking.userId !== userId){
        throw {message: 'Unauthorized', statusCode: 403}
    }
    return true
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

router.put('/:bookingId', requireAuth, validateBookingDates, async(req, res) => {
    const bookingId = req.params.bookingId
    const userId = req.user.id
    const { startDate, endDate } = req.body
    try{
        const booking = await checkBookingExists(bookingId)
       checkBookingOwner(booking, userId)

        // console.log('Check booking conflict')
        const startconflict = await validateStartDate(booking.spotId, startDate);
        const endconflict = await validateEndDate(booking.spotId, endDate);
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
            console.log('ERROR MESSAGE', errmsg)
            return res.status(403).json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errmsg
            })
        }
        // console.log('Find a Booking to Edit')
        const _booking = await Booking.findOne({
            where: {
                userId: userId,
                id: bookingId
            }
        })
        await _booking.update({
            startDate,
            endDate
        })
        res.json(_booking)

    } catch(err){
        handleNotFoundError(res, "Booking couldn't be found")
    }
})






module.exports = router;
