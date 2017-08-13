// main backend server file

var express = require('express'); // bring in express from node modules folder
var path = require('path'); // bring in our path module
var bodyParser = require('body-parser'); // bring in the body parser

var index = require('./routes/index'); // our homepage
var places = require('./routes/places'); // the API so that we can work with mongodb

var port = 3001;

var app = express(); // our main app variable

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

// conncting to port
app.listen(port, function() {
    console.log('Server started on port ' + port);
});