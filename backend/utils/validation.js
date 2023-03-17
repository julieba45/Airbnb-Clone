const { validationResult } = require('express-validator');

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
      statusCode: 404,
      errors,
    });
  };

  const handleNotFoundError = (res, message) => {
    res.status(404).json({
      message: message,
      statusCode: 404,
    });
  };

  module.exports = {
    handleValidationErrors,
    handleSequelizeValidationError,
    handleNotFoundError
  };
