'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'SpotImages';
   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url:'https://a0.muscache.com/im/pictures/c79965b5-9b22-4504-af7b-3131f5c25dfa.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 1,
      url:'https://a0.muscache.com/im/pictures/a37685ad-4b8f-402d-b9f8-d408e1e9b809.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 1,
      url:'https://a0.muscache.com/im/pictures/ddc400b2-0787-4661-b8bd-7ad3052fabf8.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 1,
      url:'https://a0.muscache.com/im/pictures/1564b1af-125a-40c2-a633-a70f13745896.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 1,
      url:'https://a0.muscache.com/im/pictures/78362fe0-ac0e-47d5-a929-bb3be94c9695.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 2,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-44274750/original/55ea1f7b-911e-46d9-b35c-aa288d8127dc.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 2,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-44274750/original/f1474bd5-16a7-4699-b33a-b036f2f37c8e.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 2,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-44274750/original/a69c6a71-6955-4e9f-89b1-1954decb5e9c.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 2,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-44274750/original/605f3f13-91c2-46f6-8a57-1cd936c55556.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 2,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-44274750/original/dcbac177-49ef-4d72-8a52-9a9acd2f06a9.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 3,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/0be3f493-fd2d-434e-b557-ad2c189b1543.jpeg?im_w=1440',
      preview: true
    },
    {
      spotId: 3,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/8c7f1364-f2b3-4e88-beec-beb45c0b53b3.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 3,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/0017dd02-0ed6-403a-9e65-9c3c6c17e474.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 3,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/c9a55179-dfeb-49fd-a68c-a68d57cef831.jpeg?im_w=1440',
      preview: false
    },
    {
      spotId: 3,
      url:'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/b0f58123-1920-4c0b-93ec-53d07229837b.jpeg?im_w=1440',
      preview: false
    },

   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {})
  }
};
