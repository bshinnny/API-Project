'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://www.google.com/images/12',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.google.com/images/21',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.google.com/images/31',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.google.com/images/1',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1g3J-jgNel0ifrcs03A91tBjJSXyOstgJHNQYlY8B&s',
        preview: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
