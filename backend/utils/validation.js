const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Booking } = require('../db/models');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = {};
      validationErrors
        .array()
        .forEach(error => errors[error.param] = error.msg);

      return _res.status(400).json({
        message: 'Validation error',
        statusCode: 400,
        errors
      })
    }
    next();
  };

  const handleSequelizeValidationError = (err, res) => {
    const errors = {};
    err.errors.forEach((error) => {
      errors[error.path] = error.message;
    });
    res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors,
    });
  };

  const handleNotFoundError = (res, message) => {
    res.status(404).json({
      message: message,
      statusCode: 404,
    });
  };



  const validateStartDate = async(spotId, startDate)=> {
    // console.log("START")
    const bookings = await Booking.findAll({
      where: {
        spotId,
        [Op.and]: [
          { startDate: { [Op.lte]: startDate } },
          { endDate: { [Op.gte]: startDate } },
        ]
      }
    })

    return bookings.length > 0;
  }


  const validateEndDate = async(spotId, endDate)=> {
    console.log('END')
    const bookings = await Booking.findAll({
      where: {
        spotId,
        [Op.and]: [
          { startDate: { [Op.lte]: endDate } },
          { endDate: { [Op.gte]: endDate } },
        ]
      }
    })
    return bookings.length > 0;
  }

  module.exports = {
    handleValidationErrors,
    handleSequelizeValidationError,
    handleNotFoundError,
    validateStartDate,
    validateEndDate
  };
