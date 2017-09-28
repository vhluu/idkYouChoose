'use strict';
var express = require('express');
var mongojs = require('mongojs');
var passport = require('passport');
var FBTokenStrategy = require('passport-facebook-token');
//var tp = require("rxjs/add/operator/toPromise");
/*var id = config.FB_CLIENT_ID;
var secret = config.FB_CLIENT_SECRET;
console.log(id);
console.log(secret);*/

var db = mongojs('mongodb://vhluu:whynot44@ds035766.mlab.com:35766/idkyouchoose_vanna', ['places']);

module.exports = function() {
    passport.use(
        new FBTokenStrategy({
            clientID: '171638416735699',
            clientSecret: '6999f5342b94e408deaf280190d956e3',
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log("finding user_id " + profile.id);
            // we want to get the user from the db

            var error;
            var promise = new Promise((resolve, reject) => {
                db.places.findOne({ "user_id" : profile.id }, function(err, usr) {
                    if (err) console.log('cant find shit');
                    console.log('usr is ' + JSON.stringify(usr) );
                    //user = usr;
                    error = err;
                    resolve(usr);    
                });
            });
            promise.then((foundUser) => {
                // if no user is found, then we will create one
                if (!foundUser) {
                    console.log("user not found: creating new user in db");
                    var newUser = {
                        fullName: profile.displayName,
                        email: profile.emails[0].value,
                        user_id: profile.id,
                        token: accessToken,
                        places: []
                    }
                    db.places.save(newUser, function(err, newUser) {
                        if (err) console.log(err);
                        console.log('newUser is ' + JSON.stringify(newUser));
                        return cb(err, newUser);
                    });
                }
                else {
                    console.log('foundUser is ' + JSON.stringify(foundUser));
                    return cb(error, foundUser);
                }
            })
            
            
        }
    ));    

};

