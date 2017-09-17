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
var filter_menu_component_1 = require("../filter-menu/filter-menu.component");
var PlacesComponent = (function () {
    function PlacesComponent(placeService, yelpFusionService) {
        var _this = this;
        this.placeService = placeService;
        this.yelpFusionService = yelpFusionService;
        this.placeService.getPlaces()
            .subscribe(function (places) {
            /*var j, x, i;
            for (i = places.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = places[i - 1];
                places[i - 1] = places[j];
                places[j] = x;
            }*/
            var i;
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
        var rand;
        if (this.fP.length > 1) {
            do {
                rand = Math.floor(Math.random() * this.fP.length);
            } while (rand == this.prev);
            this.prev = rand;
        }
        console.log(this.prev);
        this.filteredPlace = this.fP[this.prev].name;
    };
    PlacesComponent.prototype.switchCity = function () {
        console.log("switching");
    };
    PlacesComponent.prototype.generate = function () {
        var _this = this;
        this.show = this.e5.getShowTags();
        this.remove = this.e5.getRemoveTags();
        this.placeService.getTaggedPlaces(this.show + '-' + this.remove)
            .subscribe(function (places) {
            _this.fP = places;
            console.log(_this.fP);
            console.log(_this.fP.length);
            _this.prev = Math.floor(Math.random() * _this.fP.length);
            console.log(_this.prev);
            _this.filteredPlace = _this.fP[_this.prev].name;
        });
    };
    PlacesComponent.prototype.ngAfterViewInit = function () {
        console.log("after init");
        console.log(this.e4.nativeElement);
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
    __decorate([
        core_2.ViewChild('generateDiv'),
        __metadata("design:type", core_2.ElementRef)
    ], PlacesComponent.prototype, "e4", void 0);
    __decorate([
        core_2.ViewChild(filter_menu_component_1.FilterMenuComponent),
        __metadata("design:type", filter_menu_component_1.FilterMenuComponent)
    ], PlacesComponent.prototype, "e5", void 0);
    PlacesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'places',
            template: "\n    <div #adding>\n        <button (click)=\"openCard()\">+</button>\n        <add-card #myCards></add-card>\n    </div>\n    <div #generateDiv>\n        <select #selectCity (onchange)=\"switchCity()\">\n            <option *ngFor=\"let loc of uniqueLocations\" value=\"{{ loc }}\">{{ loc }}</option>\n        </select>\n        <filter-menu #fm></filter-menu>\n        <button class=\"generate\" (click)=\"generate()\">idk you choose!</button>\n    </div>\n    <div #myPlaces style=\"display:flex; margin-left: 50px\">\n        <div class=\"item\">\n            {{ filteredPlace }}\n        </div>\n        <button #next (click)=\"changeItem()\"><i class=\"material-icons\">refresh</i></button>\n    </div>",
            styles: ["\n        .generate {\n            margin-top: 20px;\n            background: white;\n            color: black;\n            border: none;\n            outline: none;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [place_service_1.PlaceService, yelpfusion_service_1.YelpFusionService])
    ], PlacesComponent);
    return PlacesComponent;
}());
exports.PlacesComponent = PlacesComponent;
//# sourceMappingURL=places.component.js.map