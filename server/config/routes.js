var express = require('express');
    router  = new express.Router();

//Require controller
var weatherController = require('../controllers/weather');

//retrieve weather api here
router.get('/weather', weatherController.weatherInfo);

module.exports = router;
