// main backend server file

var express = require('express'); // bring in express from node modules folder
var path = require('path'); // bring in our path module
var bodyParser = require('body-parser'); // bring in the body parser

var index = require('./routes/index'); // our homepage
var places = require('./routes/places'); // the API so that we can work with mongodb
var yelpfusion = require('./routes/yelpfusion'); // API for YelpFusion
var passport = require('passport');
//var social = require('./app/passport/passport');
/*var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy ({
    clientID: '171638416735699',
    clientSecret: '6999f5342b94e408deaf280190d956e3',
    callbackURL: 'http:localhost:3001/login/facebook/return'
}, 
    // verify function 
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
))*/

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