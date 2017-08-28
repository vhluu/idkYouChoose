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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var unirest_1 = require("unirest");
var YelpService = (function () {
    function YelpService(http) {
        this.http = http;
        //var resBody = this.getAccessToken('XIq9YBzVAMalw9bDoEVb9w', 'Bc1OYAu9us0KSA83YakwyiZVp2zIGtO5zOZQwjxfUE835eUCHXJfe5Mgn6sGhooQ');
        //console.log("resBody is " + resBody);
        //this.token = resBody["access_token"];
        this.token = "Gv9Pz23rMFHYA7oLgSj9Xlq3hKa_CELPgFGkN1hX_UxrHygcgUMFqg2oRW3taLAca1XrMiplFLlGc2V1sQV_pFUEhPEbRBA6L5ChMpr0uulTPWwJFdvQnNfXFH-iWXYx";
        console.log("the token is " + this.token);
        this.headers = new http_1.Headers();
        this.headers.append('Authorization', 'Bearer ' + this.token);
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition);
        }
        else {
            console.log("Could not get current position");
        }
    }
    YelpService.prototype.showPosition = function (position) {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log("the latitude is " + this.lat);
        console.log("the longitude is " + this.long);
    };
    YelpService.prototype.getAccessToken = function (clientId, clientSecret) {
        // make post request to endpoint https://api.yelp.com/oauth2/token
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('grant_type', 'client_credentials');
        urlSearchParams.append('client_id', clientId);
        urlSearchParams.append('client_secret', clientSecret);
        var body = urlSearchParams.toString();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post('https://api.yelp.com/oauth2/token', body, { headers: headers })
            .subscribe(function (data) { return console.log(data); });
        //.map((res) => res.json());
        // .subscribe(data => this.data = data);
        // console.log("the response body is " + this.data);
    };
    // we want to allow the user to enter the name and location or use current location
    // we then use this to make a get request to the yelp fusion api
    YelpService.prototype.findPlace = function (searchTerm, locationString) {
        var params = "term=" + searchTerm + "&latitude=" + this.lat + "&longitude=" + this.long + "&open_now=true&limit=5";
        console.log("params is " + params);
        console.log("headers is " + JSON.stringify(this.headers, null, 4));
        //return this.http.get('https://api.yelp.com/v3/businesses/search?term=restaurant&location=boulder', { headers: this.headers})
        //    .map(res => res.json());
        var response = unirest_1.default.get("https://api.yelp.com/v3/businesses/search?term=restaurant&location=boulder")
            .header("authorization", "Bearer " + this.token)
            .asJson();
        return response.toString();
    };
    YelpService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __metadata("design:paramtypes", [Object])
    ], YelpService);
    return YelpService;
}());
exports.YelpService = YelpService;
//# sourceMappingURL=yelp.service.js.map