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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var YelpFusionService = (function () {
    function YelpFusionService(http) {
        this.http = http;
        console.log('Yelp Fusion Service Initialized...');
        console.log("this is " + this);
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition);
        }
        else {
            console.log("Could not get current position");
        }
    }
    YelpFusionService.prototype.showPosition = function (position) {
        /*this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log("the latitude is " + this.lat);
        console.log("the longitude is " + this.long);*/
    };
    YelpFusionService.prototype.getResults = function (term, location) {
        var resultTerm = term.replace(' ', '+');
        console.log("the term is " + resultTerm);
        var resultLoc = location.replace(' ', '+');
        console.log("the location is " + resultLoc);
        return this.http.get('/yfapi/' + resultTerm + '/' + resultLoc)
            .map(function (res) { return res.json(); });
    };
    YelpFusionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], YelpFusionService);
    return YelpFusionService;
}());
exports.YelpFusionService = YelpFusionService;
//# sourceMappingURL=yelpfusion.service.js.map