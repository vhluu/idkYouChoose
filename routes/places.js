var express = require('express');
var router = express.Router();
var mongojs = require('mongojs'); // bring in mongojs

// creates db object w/ array of collections to use
var db = mongojs('mongodb://vhluu:whynot44@ds035766.mlab.com:35766/idkyouchoose_vanna', ['places']);

// gets the places
router.get('/places', function(req, res, next) {
    db.places.find(function(err, places) {
        if (err) res.send(err);
        res.json(places); // returns json content
    });
});

// gets single place
router.get('/place/:id', function(req, res, next) {
    db.places.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, place) {
        if (err) res.send(err);
        res.json(place); // returns json content
    });
});

// saves place
router.post('/place', function(req, res, next) {
    var place = req.body; // gets place from form
    if (!place.name || !place.location) {
        res.status(400);
        res.json({ "error": "Bad Data"});
    } else { 
        db.places.save(place, function(err, place) {
            if (err) res.send(err);
            res.json(place);
        });
    }
});

// deletes place
router.delete('/place/:id', function(req, res, next) {
    db.places.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, place) {
        if(err) res.send(err);
        res.json(place);
    });
});

// updates place
router.put('/place/:id', function(req, res, next) {
    var place = req.body; 
    var updPlace = {};

    if (updPlace.name) {
        updPlace.name = place.name;
    }

    if (updPlace.location) {
        updPlace.location = place.location;
    }

    if (!updPlace) {
        res.status(400);
        res.json({ "error": "Bad Data"});
    }

    else {
        db.places.update({_id: mongojs.ObjectId(req.params.id)}, updPlace, {}, function(err, place) {
            if(err) res.send(err);
            res.json(place);
        });
    }
});



module.exports = router;