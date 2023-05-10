'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        owner_id: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "TreeTop",
        description: "Place where web developers are created",
        price: 123
      },
      {
        owner_id: 1,
        address: "1234 Disney Lane",
        city: "Huntsville",
        state: "Ontario",
        country: "Canada",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Escape North to Muskoka A-Frame | 4-Season Chalet",
        description: "Welcome to Muskoka A-frame, the perfect couple’s getaway or solo retreat, nestled in beautiful Hidden Valley. This classic 70’s A-frame has been re-imagined for the modern world. Wake up to swaying treetops, make gourmet meals & relax by the fire, with 2-story forest views.",
        price: 300
      },
      {
        owner_id: 2,
        address: "1234 Disney Lane",
        city: "Marton",
        state: "Manawatu-Wanganui",
        country: "New Zealand",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Yellow Submarine",
        description: "1960's: All aboard for the magical mystery tour with the Beatles and their Yellow Submarine, powered by love; because that's what makes the world go round Cold War superpower scenario: 'Hunt for Red October'puts you in charge of nuclear mutually assured destruction,will soviet or US flinch first?",
        price: 250
      },

    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
