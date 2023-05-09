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
      userId: 1,
      spotId: 2,
      review: "This was an awesome spot!",
      stars: 5,
    },
    {
      userId: 1,
      spotId: 1,
      review: "This was an awesome spot!",
      stars: 4,
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Reviews';
   return queryInterface.bulkDelete(options, {})
  }
};
