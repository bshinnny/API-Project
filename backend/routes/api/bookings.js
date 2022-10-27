const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const { requireAuth, restoreUser } = require('../../utils/auth.js');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, Sequelize } = require("../../db/models");

const router = express.Router();

router.get('/current', requireAuth, async(req, res, next) => {
    const { user } = req;

    const currentUserBookings = await Booking.findAll({
        where: { userId: user.id },
        include: [
            {
                model: Spot,
                attributes: [ "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price" ],
                // include: { model: SpotImage, where: { preview: true, spotId:  }, attributes: ["url"] }
            }
            // { model: SpotImage, where: { preview: true }, attributes: ["url"] },
        ]
    })

    for(let i = 0; i < currentUserBookings.length; i++) {
        currentUserBookings[i] = currentUserBookings[i].toJSON();

        let previewImg = await SpotImage.findOne({
            where: {
                spotId: currentUserBookings[i].Spot.id,
                preview: true
            }
        })

        currentUserBookings[i].Spot.previewImage = previewImg.url;
    }
    // startDate & endDate is coming up as null?
    return res.json({ Bookings: currentUserBookings });
});



module.exports = router;
