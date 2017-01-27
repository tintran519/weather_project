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
  var locationLink = req.query.link;
  var options = {
    url: 'http://api.wunderground.com/api/' + process.env.API_KEY + '/forecast'+ locationLink + '.json'
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
