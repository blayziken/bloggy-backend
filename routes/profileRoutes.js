const express = require('express');
const router = express.Router();
const profileController = require('./../controllers/profileController');
const authController = require('./../controllers/authController');

router.post('/add', authController.protect, profileController.addProfile);

router.patch('/add/image', authController.protect, profileController.uploadImage, profileController.addImage);

router.get('/checkProfile', authController.protect, profileController.checkProfile);

router.get('/getProfileData', authController.protect, profileController.getProfileData);

router.patch('/update', authController.protect, profileController.updateProfile);

module.exports = router;
