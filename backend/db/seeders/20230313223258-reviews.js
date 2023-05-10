'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Reviews';
   return queryInterface.bulkInsert(options, [
    {
      userId: 2,
      spotId: 1,
      review: "This was an awesome spot!",
      stars: 5,
    },
    {
      userId: 1,
      spotId: 3,
      review: "Great views!",
      stars: 4,
    },
    // {
    //   userId: 1,
    //   spotId: 4,
    //   review: "Hospitalty on point!",
    //   stars: 4,
    // },
    // {
    //   userId: 1,
    //   spotId: 5,
    //   review: "Very cozy!",
    //   stars: 4,
    // }
   ], {})
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Reviews';
   return queryInterface.bulkDelete(options, {})
  }
};
