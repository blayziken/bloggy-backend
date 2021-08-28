const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

// To check if username is unique
router.get('/checkUsername/:username', userController.checkUsername);

router.patch('/updateUser/:username', userController.updateUser);

router.delete('/deleteUser', authController.protect, userController.deleteUser);

router.get('/:userName', userController.getUser);



module.exports = router;
