'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-545612614941895646/original/27044c35-d4fc-47c3-bc68-cfbcb96352b4.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49381739/original/ddca4b48-7044-4e29-8978-540dc9415df0.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/89a76e23-1698-4e5b-98c3-9304549a5bb8.jpg?im_w=720',
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
