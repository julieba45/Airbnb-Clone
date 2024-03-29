const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors

];

// Sign up (/api/users)
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      // console.log("---------------I MADE IT TO THE CORRECT ROUTE---------------")
      const { firstName, lastName, email, password, username } = req.body;
        // console.log("---REQ BODY INFO---", email, password, username, firstName, lastName)
        const existingUserWithEmail = await User.findOne({ where: { email } });
        const existingUserWithUsername = await User.findOne({ where: { username } });
        if (existingUserWithEmail) {
          return res.status(403).json({
            message: 'User already exists',
            statusCode: 403,
            errors: { email: 'User with that email already exists' },
          });
        }

        if (existingUserWithUsername) {
          return res.status(403).json({
            message: 'User already exists',
            statusCode: 403,
            errors: { username: 'User with that username already exists' },
          });
        }

        const user = await User.signup({ firstName, lastName, email, username, password });
    //  console.log("--OBJ SENDING BACK TO THUNK--", user.toJSON())
      await setTokenCookie(res, user);

      return res.json({
        // id: user.id,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // email: user.email,
        // username: user.username,
        // token: ''
        user
      });
    }
);









module.exports = router;
