// main backend server file

var express = require('express'); // bring in express from node modules folder
var path = require('path'); // bring in our path module
var bodyParser = require('body-parser'); // bring in the body parser
var passport = require('passport');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var router = express.Router();
var cors = require('cors');
var index = require('./routes/index'); // our homepage
var places = require('./routes/places'); // the API so that we can work with mongodb
var yelpfusion = require('./routes/yelpfusion'); // API for YelpFusion

var mongojs = require('mongojs');
var db = mongojs('mongodb://vhluu:whynot44@ds035766.mlab.com:35766/idkyouchoose_vanna', ['places']);

var port = 3001;

var passportConfig = require('./routes/passport');
passportConfig();

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
app.use(bodyParser.urlencoded({extended: true}));


// creating route
app.use('/', index); // homepage associated with index route
app.use('/api', places); // to interact with api
app.use('/yfapi', yelpfusion);

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// creates token using user's id
var createToken = function(auth) {
    return jwt.sign({ id: auth.id }, 'secret', { expiresIn: '1h'});
};

var generateToken = function(req, res, next) {
    console.log('generating token');
    console.log(req.auth);
    req.token = createToken(req.auth);
    console.log('created token ' + req.token);
    next();
};

// takes token from request object and puts it in the header
var sendToken = function(req, res) {
    console.log('setting header with token ' + req.token);
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
}


router.route('/facebook').post(passport.authenticate('facebook-token', { session: false }), function(req, res, next) {
    console.log('facebook route');
    console.log('req.user is ' + JSON.stringify(req.user));
    if (!req.user) {
        console.log('user not authenticated');
        return res.send(401, 'User not authenticated');
    }
    console.log('setting req.auth');
    req.auth = { id: req.user._id };
    next();
}, generateToken, sendToken);

var authenticate = expressJwt({
    secret: 'secret',
    requestProperty: 'auth',
    getToken: function(req) { // extracts token from request
        console.log("we are in authenticate");
        console.log('req is ' + JSON.stringify(req.headers));
        if (req.headers['x-auth-token']) {
            console.log('x-auth-token is found in request header');
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

var getCurrUser = function(req, res, next) {
    console.log('getting current user, id is ' + req.auth.id);
    db.places.findOne({_id: mongojs.ObjectId(req.auth.id)}, function(err, user) {
        if (err) next(err);
        else {
            console.log('current user is ' + JSON.stringify(user));
            req.user = user; 
            next();
        }
    });
}

var getOne = function(req, res) {
    console.log("getting one " + JSON.stringify(req.user));
    var user = req.user;
    res.json(user);
};

router.route('/me').get(authenticate, getCurrUser, getOne);
app.use('/api/auth', router);


// conncting to port
app.listen(process.env.PORT || port, function() {
    console.log('Server started on port ' + port);
});

module.exports = app;