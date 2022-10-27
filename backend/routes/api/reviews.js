const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { requireAuth, restoreUser } = require('../../utils/auth.js');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, Sequelize } = require("../../db/models");

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
    const { user } = req;

    const currentUserReviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            { model: User, attributes: [ "id", "firstName", "lastName" ]},
            {
                model: Spot,
                attributes: [ "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price" ],
                // include: { model: SpotImage, where: { preview: true, spotId:  }, attributes: ["url"] }
            },
            // { model: SpotImage, where: { preview: true }, attributes: ["url"] },
            { model: ReviewImage, attributes: ["id", "url"]}
        ]
    })

    for(let i = 0; i < currentUserReviews.length; i++) {
        currentUserReviews[i] = currentUserReviews[i].toJSON();

        let previewImg = await SpotImage.findOne({
            where: {
                spotId: currentUserReviews[i].Spot.id,
                preview: true
            }
        })

        currentUserReviews[i].Spot.previewImage = previewImg.url;
    }
    return res.json({ Reviews: currentUserReviews })
});

module.exports = router;
