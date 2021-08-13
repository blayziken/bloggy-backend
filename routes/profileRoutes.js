const express = require('express');
const router = express.Router();
const profileController = require('./../controllers/profileController');
const authController = require('./../controllers/authController');

router.post('/add', authController.protect, profileController.addProfile);



module.exports = router;
