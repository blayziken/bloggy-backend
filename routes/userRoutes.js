const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

// To check if username is unique
router.get('/checkUsername/:userName', userController.checkUsername);

router.patch('/updateUser', authController.checkToken, userController.updateUser);

router.delete('/deleteUser', authController.checkToken, userController.deleteUser);

router.get('/:userName', authController.checkToken, userController.getUser);



module.exports = router;
