var express = require('express');
var router = express.Router();
var mongojs = require('mongojs'); // bring in mongojs

// creates db object w/ array of collections to use
var db = mongojs('mongodb://vhluu:whynot44@ds035766.mlab.com:35766/idkyouchoose_vanna', ['places']);

// gets the places
router.get('/user/:id/places', function(req, res, next) {
    console.log('we here');

    db.places.findOne({'user_id': req.params.id},function(err, user) {
        if (err) res.send(err);
        console.log('usre is ' + user);
        res.json(user.places); // returns json content
    });
});

router.get('/user/:id/places/:loc/tags', function(req, res, next) {
    console.log('we there');
    db.places.distinct("places.tags", {"user_id" : req.params.id, "places.location" : req.params.loc} , function(err, distinct) {
        if (err) res.send(err);
        res.json(distinct);
    });
});


router.get('/user/:id/places/:tagName', function(req, res, next) {
    var show = req.params.tagName.split('-')[0];
    var remove;
    var user;
    if (show != "" && remove != "") {
        remove = (req.params.tagName.split('-')[1]).split(',');
        show = show.split(',');
        console.log("show is " + show);
        console.log("remove is " + remove);
        var array = [ 
            { $match: { "user_id" : req.params.id }},
           // { $unwind: "$places"},
            { $project: {
                places: {$filter: {
                    input: "$places",
                    as: "place",
                    cond: { $and: [ 
                        { $or: [
                           // { $in: [ "japanese", "$$place.tags" ] },
                            /*{ $in: [ "italian", "$$place.tags" ] }*/
                       // { $not: [ { $in: ["mexican", "$$place.tags"] } ]}
                        ]}, 
                        //{ $not: [ { $in: ["mexican", "$$place.tags"] } ]},
                        /*{ $not: [ { $in: ["thai", "$$place.tags"] } ]},*/
                    ]}
                }}
            }}
        ];
        for (var i = 0; i < show.length; i++) {
            array[1].$project.places.$filter.cond.$and[0].$or.push({ $in: [show[i], "$$place.tags"]});
        }
        for (var i = 0; i < remove.length; i++) {
            array[1].$project.places.$filter.cond.$and.push({ $not: [{ $in: [remove[i], "$$place.tags"]}] });
        }
        console.log('array is ' + JSON.stringify(array));
        db.places.aggregate(array, function(err, places) {
            if (err) res.send(err);
            console.log("1 " + JSON.stringify(places));
            res.json(places);
        })
        /*db.places.distinct("places.name", { "user_id": req.params.id, "places.tags" : { $in: show, $nin: remove } }, function(err, places) {
            if (err) res.send(err);
            console.log("1 " + JSON.stringify(places));
            res.json(places);
        });*/
    }

    else {
        remove = (req.params.tagName.split('-')[1]).split(',');
        console.log("remove is" + remove);
        db.places.distinct("places.name", { "user_id": req.params.id, "places.tags" : { $nin: remove } }, function(err, places) {
            if (err) res.send(err);
            console.log("2 " + JSON.stringify(places));
            res.json(places);
        });
    }

});


// gets single place 
router.get('/user/:id/place/:pid', function(req, res, next) {
    db.places.findOne({"user_id": req.params.id, "places.pid": req.params.pid} , function(err, place) {
        if (err) res.send(err);
        res.json(place); // returns json content
    });
});

// saves place (TODO)
/*router.post('/user/:id/place', function(req, res, next) {
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
});*/

// deletes place
router.delete('/user/:id/place/:pid', function(req, res, next) {
    db.places.update({'user_id': req.params.id, 'pid' : req.params.pid}, {$pull: places} , function(err, place) {
        if(err) res.send(err);
        res.json(place);
    });
});

// updates places; adding to places array 
router.put('/user/:id/places', function(req, res, next) {
    var place = req.body; 
    var updPlace = {};

    if (place.name) {
        updPlace.name = place.name;
    }

    if (place.location) {
        updPlace.location = place.location;
    }

    if (place.tags) {
        updPlace.tags = place.tags;
    }
    /*if (place.pid) {
        updPlace.pid = place.pid;
    }*/

    if (!updPlace) {
        res.status(400);
        res.json({ "error": "Bad Data"});
    }

    else {
        
        db.places.update({'user_id': req.params.id}, { $push: { places: updPlace }}, {}, function(err, place) {
            if(err) res.send(err);
            res.json(place);
        });
    }
});

// updates individual place (TODO)



module.exports = router;