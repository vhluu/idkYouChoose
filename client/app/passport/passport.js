var express = require('express');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: ,
    clientSecret: ,
    callbackURL: 'http://'
},
function (accessToken, refreshToken, profile, done) {
    
}
))