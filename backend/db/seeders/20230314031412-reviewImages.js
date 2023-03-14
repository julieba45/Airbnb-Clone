'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
   return queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://b1694534.smushcdn.com/1694534/wp-content/uploads/2022/01/Screenshot-2021-12-29-at-16.53.36-1.png?lossy=1&strip=1&webp=1'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'ReviewImages';
   return queryInterface.bulkDelete(options, {})
  }
};
