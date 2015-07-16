// modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configuration

//config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 9000;

// connect to mongoDB
// mongoose.connect(db.url);

//get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

//routes
require('./app/routes')(app);

//start the app
app.listen(port)

console.log("Magic happen on port " + port);

//expose the app
exports = module.exports = app;
