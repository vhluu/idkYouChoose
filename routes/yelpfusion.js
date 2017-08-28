var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/search/:term/:loc', function(req, res, next) {
    var url = 'https://api.yelp.com/v3/businesses/search';
    url = url + '?term=' + req.params.term + '&location=' + req.params.loc;
    var options = {
        url: url,
        headers: {
            'Authorization': 'Bearer Gv9Pz23rMFHYA7oLgSj9Xlq3hKa_CELPgFGkN1hX_UxrHygcgUMFqg2oRW3taLAca1XrMiplFLlGc2V1sQV_pFUEhPEbRBA6L5ChMpr0uulTPWwJFdvQnNfXFH-iWXYx'
        }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.type('application/javascript');
            res.jsonp({
                'statusCode': 200,
                'body' : JSON.parse(body)
            });
        }
        
    })
});

router.get('/search/:term/:lat/:long', function(req, res, next) {
    var url = 'https://api.yelp.com/v3/businesses/search';
    url = url + '?term=' + req.params.term + '&latitude=' + req.params.lat + '&longitiude=' + req.params.long;
    var options = {
        url: url,
        headers: {
            'Authorization': 'Bearer Gv9Pz23rMFHYA7oLgSj9Xlq3hKa_CELPgFGkN1hX_UxrHygcgUMFqg2oRW3taLAca1XrMiplFLlGc2V1sQV_pFUEhPEbRBA6L5ChMpr0uulTPWwJFdvQnNfXFH-iWXYx'
        }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.type('application/javascript');
            res.jsonp({
                'statusCode': 200,
                'body' : JSON.parse(body)
            });
        }
        else {
            console.error(error);
        }
    })
});

module.exports = router;