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
var yelpfusion_service_1 = require("../../services/yelpfusion.service");
var core_2 = require("@angular/core");
var PlacesComponent = (function () {
    function PlacesComponent(placeService, yelpFusionService) {
        var _this = this;
        this.placeService = placeService;
        this.yelpFusionService = yelpFusionService;
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
            console.log("uniqueLocations is " + _this.uniqueLocations);
            //this.selectedCity = this.e2.nativeElement.querySelector('[selected="selected"]').value;
        });
        // we want our place initially based on our current location
    }
    PlacesComponent.prototype.openCard = function () {
        console.log("e3 is " + JSON.stringify(this.e3.nativeElement.querySelector('div')));
        this.e3.nativeElement.querySelector('div').style.display = "block";
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
    __decorate([
        core_2.ViewChild('myPlaces'),
        __metadata("design:type", core_2.ElementRef)
    ], PlacesComponent.prototype, "e1", void 0);
    __decorate([
        core_2.ViewChild('selectCity'),
        __metadata("design:type", core_2.ElementRef)
    ], PlacesComponent.prototype, "e2", void 0);
    __decorate([
        core_2.ViewChild('adding'),
        __metadata("design:type", core_2.ElementRef)
    ], PlacesComponent.prototype, "e3", void 0);
    PlacesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'places',
            template: "<div #adding>\n    <button (click)=\"openCard()\">+</button>\n    <add-card #myCards></add-card>\n</div>\n<select #selectCity (onchange)=\"switchCity()\">\n    <option *ngFor=\"let loc of uniqueLocations\" value=\"{{ loc }}\">{{ loc }}</option>\n</select>\n<div #myPlaces style=\"display:flex\">\n    <div *ngFor=\"let place of places; let i = index\" class=\"item\" [class.active]=\"i==0\">\n        {{ place.name }}\n    </div>\n    <button #next (click)=\"changeItem()\"><i class=\"material-icons\">refresh</i></button>\n</div>",
        }),
        __metadata("design:paramtypes", [place_service_1.PlaceService, yelpfusion_service_1.YelpFusionService])
    ], PlacesComponent);
    return PlacesComponent;
}());
exports.PlacesComponent = PlacesComponent;
//# sourceMappingURL=places.component.js.map