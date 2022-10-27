'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '11111 Stone Bridge Lane',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 40.792240,
        lng: -118.2436849,
        name: 'Hollywood House',
        description: 'House near Hollywood.',
        price: 100.00
      },
      {
        ownerId: 1,
        address: '5000 8th Street',
        city: 'New York',
        state: 'NY',
        country: 'United States',
        lat: 34.0522342,
        lng: -73.138260,
        name: 'New York Apartment',
        description: 'Apartment near Manhattan.',
        price: 2500.50
      },
      {
        ownerId: 2,
        address: '5001 9th Street',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 35.0522342,
        lng: -74.138260,
        name: 'Upper East Side Apartment',
        description: 'Apartment near Central Park.',
        price: 2500.50
      },
      {
        ownerId: 3,
        address: '12023 River Street',
        city: 'Northridge',
        state: 'CA',
        country: 'United States',
        lat: 41.792240,
        lng: -119.2436849,
        name: 'LA Suburb House',
        description: 'Mansion in the suburbs.',
        price: 25000.99
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['Hollywood House', 'New York Apartment', 'Upper East Side Apartment', 'LA Suburb House'] }
    }, {});
  }
};