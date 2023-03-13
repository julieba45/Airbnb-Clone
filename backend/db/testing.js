const { User, Spot, Booking } = require('../db/models');


// const createTestData = async () => {
//   const user1 = await User.create({
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'johndoe@example.com',
//     username: 'johndoe',
//     password: 'password'
//   });

//   const user2 = await User.create({
//     firstName: 'Jane',
//     lastName: 'Doe',
//     email: 'janedoe@example.com',
//     username: 'janedoe',
//     password: 'password'
//   });

//   const spot1 = await Spot.create({
//     owner_id: user1.id,
//     address: '123 Main St',
//     city: 'New York',
//     state: 'NY',
//     country: 'USA',
//     lat: 40.7128,
//     lng: -74.006,
//     name: 'Luxury Apartment',
//     description: 'A luxurious apartment in the heart of the city',
//     price: 200
//   });
//   const spot2 = await Spot.create({
//     owner_id: user2.id,
//     address: '456 Elm St',
//     city: 'Los Angeles',
//     state: 'CA',
//     country: 'USA',
//     lat: 34.0522,
//     lng: -118.2437,
//     name: 'Beach House',
//     description: 'A beautiful beach house with ocean views',
//     price: 300
//   });

//   const review1 = await db.Review.create({
//     userId: user1.id,
//     spotId: spot2.id,
//     review: 'Great stay!',
//     stars: 5
//   });

//   const review2 = await db.Review.create({
//     userId: user2.id,
//     spotId: spot1.id,
//     review: 'Amazing place!',
//     stars: 4
//   });

//   const spotImage1 = await db.SpotImage.create({
//     spotId: spot1.id,
//     url: 'https://example.com/image1.jpg',
//     preview: true
//   });

//   const spotImage2 = await db.SpotImage.create({
//     spotId: spot1.id,
//     url: 'https://example.com/image2.jpg',
//     preview: false
//   });

//   const reviewImage1 = await db.ReviewImage.create({
//     reviewId: review1.id,
//     url: 'https://example.com/image3.jpg'
//   });

//   const booking1 = await Booking.create({
//     spotId: spot1.id,
//     userId: user2.id,
//     startDate: new Date(),
//     endDate: new Date(Date.now() + 86400000) // 1 day from now
//   });

//   console.log('Test data created.');
// };

// test associations
function testAssociations (){
    // find a spot and get its owner
    const spot = Spot.findOne({
      where: { id: 1 },
      include: { model: User}
    });

    console.log('Spot owner:', spot.Owner);

    // // find a user and get their spots
    // const user = await User.findOne({
    //   where: { id: 2 },
    //   include: { model: Spot }
    // });
    // console.log('User spots:', user.Spots);

    // // find a user and get their bookings
    // const userBookings = await db.User.findOne({
    // where: { id: 1 },
    // include: { model: db.Booking }
    // });

    // console.log('User bookings:', userBookings.Bookings);
}

// createTestData();
testAssociations();
