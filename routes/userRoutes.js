const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const User = require('./../models/userModel');

const router = express.Router();


// router.route('/register').post((req, res) => {
//     console.log('Register route');
//     const user = User.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     }).then(() => {
//         console.log('New user registerd');
//     }).catch(err => {
//         res.status(403).status({ msg: err });
//     });

//     console.log(user);
//     res.status(statusCode).json({
//         status: 'registered',
//         data: {
//             user 
//         }
//     });
// })

router.post('/signup', authController.signup);

// router.post('/login', authController.login);

// router.get('/logout', authController.logout);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);


// Protect all routes after this middleware
// router.use(authController.protect);
// router.use(authController.restrictTo('admin'));

// router
//     .route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);

// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;
