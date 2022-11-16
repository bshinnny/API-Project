'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-43770721/original/3df62b31-d43e-45bc-adb9-5be12570f78e.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/98b2c430-ab79-40f7-bfea-a1ccd48af3ec.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/31a643ca-fdb6-4f6c-8527-d22c0265a507.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/44f74b8f-0c6c-4f38-a43e-1285e1e19f65.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/6f9991c1-3102-45a8-a03d-e35054bdff02.jpg?im_w=720',
        preview: false
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
        url: 'https://a0.muscache.com/im/pictures/c8485f3e-59bd-43bc-821e-bbd7719f90a4.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/c6954424-df27-44dc-bc0a-a4038e113e21.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/f859e159-8725-430d-9a6c-4747d6edf464.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/b97829bc-2e9c-4530-b9b4-c9bb1376ad47.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/a26391b3-b8ac-4a27-a485-2c52ae95fc4f.jpg?im_w=720',
        preview: false
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
