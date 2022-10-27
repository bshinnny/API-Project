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
        if(previewImg) {
            currentUserBookings[i].Spot.previewImage = previewImg.url;
        } else {
            currentUserBookings[i].Spot.previewImage = null;
        }
    }
    // startDate & endDate is coming up as null?
    return res.json({ Bookings: currentUserBookings });
});

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const { user } = req;

    const booking = await Booking.findByPk(bookingId);

    if(!booking) {
        const err = new Error(`Booking couldn't be found`)
        err.status = 404
        return next(err)
    }

    if (booking && parseInt(booking.userId) === parseInt(user.id)) {
        const startDateNew = new Date(startDate)
        const endDateNew = new Date(endDate)

        if (startDateNew > endDateNew) {
            const err = new Error('Validation error')
            err.status = 400
            err.errors = { endDate: "endDate cannot come before startDate" }
            return next(err)
        }

        if (new Date() > endDateNew) {
            const err = Error(`Past bookings can't be modified`)
            err.status = 403
            return next(err)
        }

        if(booking.startDate === startDate && booking.endDate === endDate) {
            const err = Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
            return next(err)
        }

        if(booking.startDate === startDate) {
            const err = Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403
            err.errors = {
                startDate: "Start date conflicts with an existing booking",
            }
            return next(err)
        }

        if(booking.endDate === endDate) {
            const err = Error("Sorry, this spot is already booked for the specified dates")
            err.status = 403
            err.errors = {
                endDate: "End date conflicts with an existing booking",
            }
            return next(err)
        }

        await booking.update({
            startDate,
            endDate,
        })

        // startDate & endDate is coming up as null?
        return res.json(booking)
    } else {
        const err = Error(`Forbidden: You can't book your own spot.`);
        err.status = 403
        return next(err);
    }
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const { bookingId } = req.params;
    const { user } = req;

    const booking = await Booking.findByPk(bookingId);
    if(booking && parseInt(booking.userId) !== parseInt(user.id)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    if(booking.startDate < new Date()) {
        const err = new Error(`Bookings that have been started can't be deleted`);
        err.status = 403;
        return next(err);
    }
    if(booking) {
        await booking.destroy();
        return res.json({ message: 'Successfully deleted', statusCode: 200 });
    } else {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }
});

module.exports = router;
