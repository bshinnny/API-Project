'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'Great house.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Great apartment.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Big apartment with nice views.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Nice house but not nicer than mine',
        stars: 4
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Bookings', {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
