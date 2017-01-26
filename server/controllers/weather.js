var request = require('request');

const url = 'http://autocomplete.wunderground.com/aq?query=';

var weatherInfo = function(req,res) {
  var query = req.query.location;
  var options = {
    url: url + query
  };
  console.log(options);
  request(options, function(err, response, body){
    res.json(JSON.parse(body))
  });
}

module.exports = {
  weatherInfo: weatherInfo
}
