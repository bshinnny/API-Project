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

const imageMax = async (req, res, next) => {
    const { reviewId } = req.params;

    const imageCount = await ReviewImage.count({
        where: { reviewId }
    })

    if(imageCount >= 10) {
        const err = new Error(`Maximum number of images for this resource was reached`);
        err.status = 403;
        return next(err);
    } else {
        next();
    }
}

// Add an Image to a Review based on the Review's ID
router.post('/:reviewId/images', requireAuth, imageMax, async(req, res, next) => {
    const { url } = req.body;
    const { reviewId } = req.params;
    const { user } = req;

    const review = await Review.findByPk(reviewId);
    if (review && parseInt(review.userId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    const image = await ReviewImage.create({
        reviewId,
        url,
    })
    return res.json({ id: image.id, url: image.url });
})

// Edit a Review
router.put('/:reviewId', validateReview, requireAuth, async(req, res, next) => {
    const { review, stars } = req.body;
    const { reviewId } = req.params;
    const { user } = req;

    const oldReview = await Review.findByPk(reviewId);
    if (oldReview && parseInt(oldReview.userId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    if(oldReview) {
        await oldReview.update({
            review,
            stars
        });

        return res.json(oldReview);
    } else {
        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        return next(err);
    }
})

// Delete a Review
router.delete('/:reviewId', validateReview, requireAuth, async(req, res, next) => {
    const { reviewId } = req.params;
    const { user } = req;

    const review = await Review.findByOk(reviewId);
    if(review && parseInt(review.userId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    if(review) {
        review.destroy();
        return res.json({ message: 'Successfully deleted', statusCode: 200 });
    } else {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }
})
module.exports = router;
