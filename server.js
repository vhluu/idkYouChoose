// main backend server file

var express = require('express'); // bring in express from node modules folder
var path = require('path'); // bring in our path module
var bodyParser = require('body-parser'); // bring in the body parser
var passport = require('passport');
var jwt = require('jsonwebtoken');
var index = require('./routes/index'); // our homepage
var places = require('./routes/places'); // the API so that we can work with mongodb
var yelpfusion = require('./routes/yelpfusion'); // API for YelpFusion

var port = 3001;

var app = express(); // our main app variable
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// View Engine
app.set('views', path.join(__dirname, 'views')); // folder we want to use for our views
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// static client folder for Angular2 files
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json()); // to parse json
app.use(bodyParser.urlencoded({extended: false}));


// creating route
app.use('/', index); // homepage associated with index route
app.use('/api', places); // to interact with api
app.use('/yfapi', yelpfusion);

// conncting to port
app.listen(process.env.PORT || port, function() {
    console.log('Server started on port ' + port);
});

var createToken = function(auth) {
    return jwt.sign({ id: auth.id}, 'secret', { expiresIn: '1h'});
};

var generateToken = function(req, res, next) {
    req.token = createToken(req.auth);
    next();
};

var sendToken = function(req, res) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
}