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
var PlaceService = (function () {
    // inject Http module 
    function PlaceService(http) {
        this.http = http;
        console.log('Place Service Initialized...');
    }
    PlaceService.prototype.getPlaces = function (id) {
        console.log('user id is ' + id);
        return this.http.get('/api/user/' + id + '/places') // make get request to our api
            .map(function (res) { return res.json(); });
    };
    PlaceService.prototype.getTaggedPlaces = function (id, tagName) {
        return this.http.get('/api/user/' + id + '/places/' + tagName)
            .map(function (res) { return res.json(); });
    };
    // get distinct tags for a specific location
    PlaceService.prototype.getDistinctTags = function (id, loc) {
        return this.http.get('/api/user/' + id + '/places/' + loc + '/tags')
            .map(function (res) { return res.json(); });
    };
    // we have to be professional so drin/p isnt affliated with our org
    // unique pledging experience
    PlaceService.prototype.addPlace = function (id, newPlace) {
        console.log("new place is " + newPlace);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        // post request. we want the place as a string
        return this.http.put('/api/user/' + id + '/places', JSON.stringify(newPlace), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PlaceService.prototype.deletePlace = function (id, pid) {
        // delete request
        return this.http.delete('/api/user/' + id + '/place/' + pid)
            .map(function (res) { return res.json(); });
    };
    PlaceService.prototype.updatePlace = function (id, place) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        // put request
        return this.http.put('/api/user/' + id + '/place/' + place.pid, JSON.stringify(place), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PlaceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], PlaceService);
    return PlaceService;
}());
exports.PlaceService = PlaceService;
//# sourceMappingURL=place.service.js.map