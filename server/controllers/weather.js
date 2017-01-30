var request = require('request');

const url = 'http://autocomplete.wunderground.com/aq?query=';

var locationList = function(req,res) {
  var query = req.query.q;
  var options = {
    url: url + query
  };
  request(options, function(err, response, body){
    res.json(JSON.parse(body))
  });
}

var weatherInfo = function(req,res) {
  'http://api.wunderground.com/api/f2164d39ab49397d/forecast/q/zmw:94125.1.99999.json'
  var locationLink = req.params.zmw;
  var options = {
    url: 'http://api.wunderground.com/api/' + process.env.API_KEY + '/forecast/conditions/q/zmw:'+ req.params.zmw + '.json'
  };
  console.log(options);
  request(options, function(err, response, body) {
    res.json(JSON.parse(body))
  });
}

module.exports = {
  locationList: locationList,
  weatherInfo: weatherInfo
}
