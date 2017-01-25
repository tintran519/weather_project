var request = require('request');

const url = 'http://api.wunderground.com/api/';

var weatherInfo = function(req,res) {
  var query_city = req.params.city;
  var query_state = req.params.state;
  var options = {
    url: url + `${process.env.API_KEY}/forecast/geolookup/q/${query_state}/${query_city}.json`
  };
  console.log(options);
  request(options, function(err, response, body){
    res.json(JSON.parse(body))
  });
}

module.exports = {
  weatherInfo: weatherInfo
}
