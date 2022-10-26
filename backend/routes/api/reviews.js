const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { requireAuth, restoreUser } = require('../../utils/auth.js');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage(`Review text is required`),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage(`Review couldn't be found`)
        .isInt({ gt: 0, lt: 6 })
        .withMessage(`Stars must be an integer from 1 to 5`),
    handleValidationErrors
];

// GET all Reviews of the Current User
router.get('/current', requireAuth, async(req, res) => {
    // const reviews
})
