const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { requireAuth, restoreUser } = require('../../utils/auth.js');
const { Spot, User, Review, SpotImage, ReviewImage, Sequelize } = require('../../db/models');
const { Model } = require('sequelize');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isNumeric()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

// GET all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const currentUserSpots = await Spot.findAll({
        where: { ownerId: user.id },
        include: [
            { model: Review, attributes: [] },
            { model: SpotImage, attributes: [] }
        ],
        attributes: {
            include: [
            [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
            [Sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        group: ['Spot.id', 'previewImage']
    });

    return res.json({ Spots: currentUserSpots });
});

// GET details for a Spot from an ID
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'], required: false },
            { model: Review, attributes: [] },
            { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']}
        ],
        attributes: {
        include: [
            [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
            [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
        ]
        },
        group: ['SpotImages.id', 'Spot.id', 'Owner.id']
    });

    if (spot) {
        return res.json(spot);
    } else {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        next(err);
    }
});

// GET all Spots.
router.get('/', async (_req, res, _next) => {
    const allSpots = await Spot.findAll({
        include: [
        { model: Review, attributes: [] },
        { model: SpotImage, attributes: [] }
        ],
        attributes: {
        include: [
            [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'],
            [Sequelize.col('SpotImages.url'), 'previewImage']
        ]
        },
        group: ['Spot.id', 'previewImage']
    });

    return res.json({ Spots: allSpots });
});



// Add an Image to a Spot based on the Spot's ID
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const {spotId} = req.params;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
      }

    if (spot) {
        const newSpotImage = await SpotImage.create({
            spotId,
            url,
            preview,
        });

        res.json({
            id: newSpotImage.id,
            url: newSpotImage.url,
            preview: newSpotImage.preview
        });
    } else {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        next(err);
    }
});

// POST a Spot
router.post('/', validateSpot, requireAuth, async (req, res, _next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const { user } = req;

    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201).json(newSpot);
});

// Edit a Spot
router.put('/:spotId', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { spotId } = req.params;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    }

    if (spot) {
        await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
        });

        return res.json(spot);
    } else {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        next(err);
    }
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (spot && parseInt(spot.ownerId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
      }

    if (spot) {
        spot.destroy();
        return res.json({ message: 'Succssfully deleted', statusCode: 200 });
    } else {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        next(err);
    }
});

module.exports = router;
