const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, this is a backend API for the Flutter Blog App');
});

module.exports = router;
