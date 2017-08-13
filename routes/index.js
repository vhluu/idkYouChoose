var express = require('express');
var router = express.Router(); // use express router

// set router for home page. it's going to accept a GET request
// callback function takes request, response, & next
router.get('/', function(req, res, next) {
    res.render('index.html');
});

module.exports = router;