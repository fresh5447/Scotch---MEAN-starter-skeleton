// modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Beer = require('./app/models/beer');

//configuration

//config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 9000;

var router = express.Router();

router.route('/beers')
	.post(function(req, res){
		var beer = new Beer();
		beer.name = req.body.name;

		beer.save(function(err){
			if(err)
				res.send(err);
			res.json({message: "Beer created!"});
		});
	})
	.get(function(req,res){
		Beer.find(function(err, beers){
			if(err)
				res.send(err);
			res.json(beers);
		});
	});

router.route('/beers/:beer_id')
	.get(function(req, res){
		Beer.findById(req.params.beer_id, function(err, beer){
			if (err)
				res.send(err);
			res.json(beer);
		});
	})
	.put(function(req, res){
		Beer.findById(req.params.beer_id, function(err, beer){
			if (err)
				res.send(err);
			beer.name = req.body.name;

			beer.save(function(err){
				if (err)
					res.send(err)
				res.json({message: 'beer updated'});
			});
		});
	})
	.delete(function(req, res){
		Beer.remove({
			_id: req.params.beer_id
		}, function(err, bear){
				if (err)
					res.send(err);
				res.json({message: "Beer deleted!"});
		});
	});

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req,res){
	res.json({message: 'hooray welcome to our api!'});
});

// connect to mongoDB
// mongoose.connect(db.url);

//get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

app.use('/api', router);

//routes
require('./app/routes')(app);

//start the app
app.listen(port)

console.log("Magic happen on port " + port);

//expose the app
exports = module.exports = app;
