const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors, handleNotFoundError } = require('../../utils/validation');

const validateLogin = [   //array of middleware
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// Log in (/api/session)
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
          statusCode: 401,
        });
      }

      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    // requireAuth,
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        console.log('-------USER.TOSAFEOBJECT', user.toSafeObject())
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
);


module.exports = router;
