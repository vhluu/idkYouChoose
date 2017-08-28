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
var place_service_1 = require("../../services/place.service");
var yelp_service_1 = require("../../services/yelp.service");
var core_2 = require("@angular/core");
var PlacesComponent = (function () {
    function PlacesComponent(placeService, yelpService) {
        var _this = this;
        this.placeService = placeService;
        this.yelpService = yelpService;
        this.placeService.getPlaces()
            .subscribe(function (places) {
            var j, x, i;
            for (i = places.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = places[i - 1];
                places[i - 1] = places[j];
                places[j] = x;
            }
            console.log(places);
            _this.places = places;
            _this.uniqueLocations = [];
            _this.showing = 0;
            for (i = 0; i < _this.places.length; i++) {
                if (_this.uniqueLocations.indexOf(_this.places[i].location) == -1) {
                    _this.uniqueLocations.push(_this.places[i].location);
                }
            }
            console.log(_this.e1.nativeElement.querySelector('[selected="true"]'));
            _this.selectedCity = _this.e1.nativeElement.querySelector('[selected="true"]').value;
            console.log(_this.selectedCity);
            console.log(_this.uniqueLocations);
        });
        // we want our place initially based on our current location
    }
    // when adding a place, once we submit our form, then we call this method
    // it will get the search results and then display them for the user to select
    PlacesComponent.prototype.submitSearch = function () {
        // get the first string
        var _this = this;
        // get the second string
        console.log("first string is " + this.name);
        console.log("second string is " + this.city);
        this.yelpService.findPlace(this.name, this.city)
            .subscribe(function (found) {
            _this.found = found;
            console.log("found " + _this.found);
        });
        // we are going to display the results to the user
    };
    // this is for when the user selects one of the results and adds it to their places
    // we are going to add this place using our place service
    PlacesComponent.prototype.submitAdd = function () {
        var toAdd = {};
        this.placeService.addPlace(toAdd);
    };
    PlacesComponent.prototype.ngAfterViewInit = function () {
        console.log(this.e1.nativeElement);
    };
    PlacesComponent.prototype.changeItem = function () {
        if (!((this.showing + 1) >= this.places.length)) {
            this.e1.nativeElement.querySelectorAll('div')[this.showing].className = "item";
            this.showing++;
            this.e1.nativeElement.querySelectorAll('div')[this.showing].className = "item active";
        }
    };
    PlacesComponent.prototype.switchCity = function () {
        console.log("switching");
    };
    PlacesComponent.prototype.addPlace = function (event) {
        var _this = this;
        event.preventDefault();
        console.log(this.city);
        console.log(this.name);
        var newPlace = {
            name: this.name,
            location: this.city
        };
        this.placeService.addPlace(newPlace)
            .subscribe(function (place) {
            _this.places.push(place);
            _this.name = '';
            _this.city = '';
        });
        if (this.uniqueLocations.indexOf(this.city) == -1) {
            this.uniqueLocations.push(this.city);
        }
        console.log(this.uniqueLocations);
    };
    __decorate([
        core_2.ViewChild('myPlaces'),
        __metadata("design:type", core_2.ElementRef)
    ], PlacesComponent.prototype, "e1", void 0);
    PlacesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'places',
            template: "<form (submit)=\"submitSearch()\">\n    <input name=\"first\" type=\"text\" [(ngModel)]=\"name\" placeHolder=\"Name\"/>\n    <input name=\"second\" type=\"text\" [(ngModel)]=\"city\" placeHolder=\"City\"/>\n    <input name=\"submit\" type=\"submit\" value=\"Submit\"/>\n</form>\n<select #selectCity (onchange)=\"switchCity()\">\n    <option *ngFor=\"let loc of uniqueLocations; \" value=\"{{ loc }}\" selected=\"i==0\">{{ loc }}</option>\n</select>\n<div #myPlaces style=\"display:flex\">\n    <div *ngFor=\"let place of places; let i = index\" class=\"item\" [class.active]=\"i==0\">\n        {{ place.name }}\n    </div>\n    <button #next (click)=\"changeItem()\"><i class=\"material-icons\">refresh</i></button>\n</div>",
        }),
        __metadata("design:paramtypes", [place_service_1.PlaceService, yelp_service_1.YelpService])
    ], PlacesComponent);
    return PlacesComponent;
}());
exports.PlacesComponent = PlacesComponent;
//# sourceMappingURL=places.component.js.map