"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        // initializing library that is used to communicate with facebook
        FB.init({
            appId: '171638416735699',
            status: false,
            cookie: false,
            // the session
            xfbml: false,
            version: 'v2.8' // use graph api version 2.5
        });
    }
    UserService.prototype.fbLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // try to get user's data. will open fb login dialog if ser is not logged in 
            FB.login(function (result) {
                if (result.authResponse) {
                    console.log("access token is " + result.authResponse.accessToken);
                    // try to login user in backend
                    return _this.http.post('/api/auth/facebook', { access_token: result.authResponse.accessToken })
                        .toPromise() // converts an observable to a promise
                        .then(function (response) {
                        console.log("x-auth-token is " + response.headers.get('x-auth-token'));
                        var token = response.headers.get('x-auth-token');
                        if (token) {
                            localStorage.setItem('idToken', token);
                            console.log('idToken is ' + token);
                        }
                        resolve(response.json()); // returns user data
                    })
                        .catch(function () { return reject(); });
                }
                else {
                    reject(); // fails
                }
            }, { scope: 'public_profile,email,user_friends' }); // list of permissions to request from user
        });
    };
    // deletes token from local storage
    UserService.prototype.logout = function () {
        console.log('removing idToken');
        localStorage.removeItem('idToken');
    };
    // boolean from whether user is logged in or not
    UserService.prototype.isLoggedIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getCurrentUser().then(function (user) { return resolve(true); }).catch(function () { return reject(false); });
        });
    };
    UserService.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this.http.get('/api/auth/me').toPromise().then(function (response) {
                resolve(response.json());
            }).catch(function () { return reject(); });
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angular2_jwt_1.AuthHttp])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map