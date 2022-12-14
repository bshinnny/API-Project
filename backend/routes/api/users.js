const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      // Ask tomorrow if we need this.
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4, max: 30 })
      .withMessage('Please provide a username with 4-50 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required')
      .isLength({ max: 50})
      .withMessage('First name must be less than 50 characters.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required')
      .isLength({ max: 50})
      .withMessage('Last name must be less than 50 characters.'),
    handleValidationErrors
];

// Sign up.
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { email, password, username, firstName, lastName } = req.body;

        const emailExists = await User.findOne({ where: { email } });
        // console.log(emailExists)
        if (emailExists) {
          const err = Error("User already exists");
          err.errors = ["User with that email already exists"];
          err.status = 403;
          return next(err);
        }

        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
          const err = Error("User already exists");
          err.errors = ["User with that username already exists"];
          err.status = 403;
          return next(err);
        }

        const user = await User.signup({ email, username, password, firstName, lastName });
        const tokenCookie = await setTokenCookie(res, user);
        return res.json({ user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          // token: tokenCookie,
        }});
    }
);

module.exports = router;
