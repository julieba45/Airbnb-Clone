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
    {
      spotId: 4,
      url:'https://a0.muscache.com/im/pictures/3fb69cb1-32dc-4b21-a0fd-ee3e081814ac.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 4,
      url:'https://a0.muscache.com/im/pictures/9932c273-2abd-44d3-8c82-ae7e6fc96c75.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 4,
      url:'https://a0.muscache.com/im/pictures/d962a1d8-3d5f-4a91-969f-9b0609d15b26.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 4,
      url:'https://a0.muscache.com/im/pictures/5b81480f-26bb-47a6-bd32-cd0e48c58d92.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 4,
      url:'https://a0.muscache.com/im/pictures/85802589/75a86cfc_original.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 5,
      url:'https://a0.muscache.com/im/pictures/b7c9264d-73c9-45c3-882e-6e9577d63d68.jpg?im_w=1440',
      preview: true
    },
    {
      spotId: 5,
      url:'https://a0.muscache.com/im/pictures/4fb18cad-f0cc-4c15-a82c-eb6a400137a6.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 5,
      url:'https://a0.muscache.com/im/pictures/a8e9f2b6-3cf9-4dd9-ae2d-c1629e395285.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 5,
      url:'https://a0.muscache.com/im/pictures/7f1b1c79-78ed-434d-9d05-896dc39c6620.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 5,
      url:'https://a0.muscache.com/im/pictures/4588d88f-0224-42f4-94cb-594f4d362fba.jpg?im_w=1440',
      preview: false
    },
    {
      spotId: 6,
      url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/cae4b265-0ab6-4993-9eef-0274b187b116.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 6,
      url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/e724ddba-9e43-4942-96cc-0e3bddd07ec4.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 6,
      url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/f88dc1ea-9108-47ab-8d22-4753da025562.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 6,
      url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/918a04d3-518d-420e-bb67-1b32264fde06.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 6,
      url:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-34444025/original/cad3d59e-4dfc-4de8-b365-34f630e64b6e.jpeg?im_w=1200',
      preview: false
    },
    {
      spotId: 7,
      url:'https://a0.muscache.com/im/pictures/56467892-0d23-4ab1-8302-9c3d0d5e52cd.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 7,
      url:'https://a0.muscache.com/im/pictures/e973414d-670a-495c-9c10-9c5b7c50d46c.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 7,
      url:'https://a0.muscache.com/im/pictures/a7f86e41-3cf5-4994-bc84-ce9036138149.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 7,
      url:'https://a0.muscache.com/im/pictures/a56b89e4-5607-4e3e-a69d-e112a17355cc.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 7,
      url:'https://a0.muscache.com/im/pictures/136a6623-0edc-4f45-b898-6ed6571dce7c.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 8,
      url:'https://a0.muscache.com/im/pictures/4a5c629b-9c92-450e-8d8f-995875798838.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 8,
      url:'https://a0.muscache.com/im/pictures/08a9afde-e2f2-48aa-b8b0-a7e747318943.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 8,
      url:'https://a0.muscache.com/im/pictures/0295e1cd-09fe-448a-b837-7bf5ade3809c.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 8,
      url:'https://a0.muscache.com/im/pictures/b51f509a-9c94-4d1c-a31c-1a465e1670ac.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 8,
      url:'https://a0.muscache.com/im/pictures/276785e7-060d-41e6-bab3-44bbcb3916aa.jpg?im_w=1200',
      preview: false
    },

   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {})
  }
};
