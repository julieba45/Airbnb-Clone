const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

// router.post('/test', function(req, res) {        //will be used later
//     res.json({ requestBody: req.body });
//   });

// // Testing
// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // GET /api/restore-user
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// GET /api/spots
const { User, Spot } = require('../../db/models');
// router.get('/spots', async (req, res) =>{
//     const spot = await Spot.findOne({
//         where: { id: 1 },
//         include: { model: User}
//       })
//       return res.json(spot)
//     }
// );

const {Review} = require('../../db/models');
router.get('/reviews', async(req, res) => {
    const review = await Review.findOne({
        where: { id: 1 },
        include: { model: User}
    })
    return res.json(review)
})





module.exports = router;
