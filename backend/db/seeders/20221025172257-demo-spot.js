'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '11111 Stone Bridge Lane',
        city: 'Malibu',
        state: 'California',
        country: 'United States',
        lat: 40.792240,
        lng: -118.2436849,
        name: 'Malibu Beach House',
        description: 'Mansion near Malibu Beach.',
        price: 100.00
      },
      {
        ownerId: 1,
        address: '5000 8th Street',
        city: 'Manhattan',
        state: 'New York',
        country: 'United States',
        lat: 34.0522342,
        lng: -73.138260,
        name: 'New York Apartment',
        description: 'Apartment near Manhattan.',
        price: 2500.00
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
        price: 2500.00
      },
      {
        ownerId: 3,
        address: '12023 River Street',
        city: 'Northridge',
        state: 'California',
        country: 'United States',
        lat: 41.792240,
        lng: -119.2436849,
        name: 'Santa Monica Beach Getaway',
        description: 'Property near Santa Monica.',
        price: 25000.99
      },
      {
        ownerId: 1,
        address: '11111 Stone Bridge Drive',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 40.792240,
        lng: -118.2436849,
        name: 'Los Angeles Mansion',
        description: 'Mansion in DTLA.',
        price: 150.00
      },
      {
        ownerId: 1,
        address: '11111 Stone Bridge Way',
        city: 'Boston',
        state: 'Massachusetts',
        country: 'United States',
        lat: 40.792240,
        lng: -118.2436849,
        name: 'Historic Boston House',
        description: 'Historic Boston home.',
        price: 100.00
      },
      {
        ownerId: 3,
        address: '12023 River Drive',
        city: 'Big Bear',
        state: 'California',
        country: 'United States',
        lat: 41.792240,
        lng: -119.2436849,
        name: 'Big Bear Getaway',
        description: 'Property near the mountains of CA.',
        price: 1000
      },
      {
        ownerId: 3,
        address: '12023 River Way',
        city: 'Northridge',
        state: 'California',
        country: 'United States',
        lat: 41.792240,
        lng: -119.2436849,
        name: 'SoCal Mansion',
        description: 'Property near Santa Monica.',
        price: 550
      },
      {
        ownerId: 1,
        address: '22222 Stone Bridge Drive',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 40.792240,
        lng: -118.2436849,
        name: 'Los Angeles Villa',
        description: 'Villa in DTLA.',
        price: 350
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['Malibu Beach House', 'New York Apartment', 'Upper East Side Apartment', 'Santa Monica Beach Getaway', 'Los Angeles Mansion', 'Historic Boston House', 'Big Bear Getaway', 'SoCal Mansion', 'Los Angeles Villa'] }
    }, {});
  }
};
