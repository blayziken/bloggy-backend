const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint for the Flutter Blog App API, still working on other endpoints.');

});

module.exports = router;
