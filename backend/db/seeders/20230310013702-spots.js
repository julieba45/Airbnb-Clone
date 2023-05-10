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
        address: "124 Disney Lane",
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
        address: "125 Disney Lane",
        city: "Marton",
        state: "Manawatu-Wanganui",
        country: "New Zealand",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Yellow Submarine",
        description: "1960's: All aboard for the magical mystery tour with the Beatles and their Yellow Submarine, powered by love; because that's what makes the world go round Cold War superpower scenario: 'Hunt for Red October'puts you in charge of nuclear mutually assured destruction,will soviet or US flinch first?",
        price: 250
      },{
        owner_id: 3,
        address: "126 Disney Lane",
        city: "Terlingua",
        state: "Texas",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Domeland: Off-grid Adobe Dome near Big Bend",
        description: "The Off Grid Dome shelter is accepting rental guests to share the off-grid experience, and to also help fund this project and future projects . The dome is a very remote and unique space in the desert near Big Bend National Park.The dome rests in an isolated but easily accessible off-grid setting in one of the few remaining territories under a dark sky ordinance, which offers unmatched views of the night sky, and a completely unobstructed view of a horizon that delivers truly majestic sunrises and sunsets. Though the dome is isolated, the entrance to Big Bend National Park is just a 25 minute drive and the historic Terlingua Ghost town about the same.",
        price: 287
      },{
        owner_id: 3,
        address: "127 Disney Lane",
        city: "Drimnin",
        state: "Scotland",
        country: "United Kingdom",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Unique and Secluded AirShip with Breathtaking Highland Views",
        description: "Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminum pod designed by Roderick James with views of the Sound of Mull from dragonfly windows. Airship002 is comfortable, quirky and cool. It does not pretend to be a five star hotel. The reviews tell the story. If booked for the dates you want check out our new listing The Pilot House, Drimnin which is on the same 4 acra site.",
        price: 330
      },
      {
        owner_id: 3,
        address: "128 Disney Lane",
        city: "Marton",
        state: "Manawatu-Wanganui",
        country: "New Zealand",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Yellow Submarine",
        description: "1960's: All aboard for the magical mystery tour with the Beatles and their Yellow Submarine, powered by love; because that's what makes the world go round Cold War superpower scenario: 'Hunt for Red October'puts you in charge of nuclear mutually assured destruction,will soviet or US flinch first?",
        price: 250
      },
      {
        owner_id: 3,
        address: "129 Disney Lane",
        city: "Marton",
        state: "Manawatu-Wanganui",
        country: "New Zealand",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Yellow Submarine",
        description: "1960's: All aboard for the magical mystery tour with the Beatles and their Yellow Submarine, powered by love; because that's what makes the world go round Cold War superpower scenario: 'Hunt for Red October'puts you in charge of nuclear mutually assured destruction,will soviet or US flinch first?",
        price: 250
      },
      {
        owner_id: 3,
        address: "130 Disney Lane",
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
