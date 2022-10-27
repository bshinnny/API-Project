const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { requireAuth, restoreUser } = require('../../utils/auth.js');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, Sequelize } = require("../../db/models");

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const { user } = req

    const image = await SpotImage.findByPk(imageId, {
        include: [
            { model: Spot, attributes: ['ownerId'] },
        ]
    });

    if (image && parseInt(image.Spot.ownerId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }

    if (image) {
        await image.destroy();
        res.json({ message: 'Successfully deleted', statusCode: 200 });
    } else {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        next(err);
    }
});

module.exports = router;
