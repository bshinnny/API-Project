'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 4,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1g3J-jgNel0ifrcs03A91tBjJSXyOstgJHNQYlY8B&s'
      },
      {
        reviewId: 1,
        url: 'https://www.google.com/images/12'
      },
      {
        reviewId: 2,
        url: 'https://www.google.com/images/21'
      },
      {
        reviewId: 3,
        url: 'https://www.google.com/images/31'
      },
      {
        reviewId: 3,
        url: 'https://www.google.com/images/1'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
