var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');

//local libs
var env    = require('./config/environment');
var routes = require('./config/routes');


//instantiate server app
var app = express();

//load secrets from .env
require('dotenv').config();

//set port
var port = process.env.PORT || 9000;

// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//define 'dynamic' routes
app.use('/', routes);

app.use(express.static(path.join(__dirname, './client/build')));

//start server
app.listen(port);
console.log('Express is now listening on ' + port);
