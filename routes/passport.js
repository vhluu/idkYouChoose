'use strict';
var express = require('express');
var mongojs = require('mongojs');
var passport = require('passport');
var FbTokenStrategy = require('passport-facebook-token');
var id = config.FB_CLIENT_ID;
var secret = config.FB_CLIENT_SECRET;
console.log(id);
console.log(secret);

var db = mongojs('mongodb://vhluu:whynot44@ds035766.mlab.com:35766/idkyouchoose_vanna', ['places']);

module.exports = function() {
    passport.use(
        new FBTokenStrategy({
            clientID: id,
            clientSecret: secret,
        },
        function (accessToken, refreshToken, profile, cb) {
            // we want to get the user from the db
            var user = db.places.findOne({ "user_id" : profile.id });
            console.log(user);
            // if no user is found, then we will create one
            if (!user) {
                var newUser = {
                    fullName: profile.displayName,
                    email: profile.emails[0].value,
                    user_id: profile.id,
                    token: accessToken,
                    places: []
                }
                db.places.save(newUser, function(err, newUser) {
                    if (err) console.log(error);
                    return cb(error, newUser);
                });
            }
            else {
                return cb(err, user);
            }
            
        }
    ));    

};

