var express = require('express');
    router  = new express.Router();

//Require controller
var weatherController = require('../controllers/weather');

//retrieve weather api here
router.get('/location', weatherController.locationList);
router.get('/weather/:zmw', weatherController.weatherInfo);

module.exports = router;
