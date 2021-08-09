const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.patch('/updateUser', authController.protect, userController.updateUser);

router.delete('/deleteUser', authController.protect, userController.deleteUser);

router.get('/:userName', authController.protect, userController.getUser);

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
