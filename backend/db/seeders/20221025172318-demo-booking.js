'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-11-11',
        endDate: '2022-11-12'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2022-11-16',
        endDate: '2022-11-18'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-11-10',
        endDate: '2022-11-30'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2022-12-25',
        endDate: '2022-12-26'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Bookings', {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
