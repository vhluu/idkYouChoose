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
var AddCardComponent = (function () {
    function AddCardComponent(placeService, yelpFusionService) {
        this.placeService = placeService;
        this.yelpFusionService = yelpFusionService;
        this.uniqueLocations = [];
        this.tags = [];
    }
    // when adding a place, once we submit our form, then we call this method
    // it will get the search results and then display them for the user to select
    AddCardComponent.prototype.submitSearch = function () {
        // get the first string
        var _this = this;
        // get the second string
        console.log("first string is " + this.name);
        console.log("second string is " + this.city);
        this.yelpFusionService.getResults(this.name, this.city)
            .subscribe(function (found) {
            _this.found = found.body.businesses;
            console.log("found " + JSON.stringify(_this.found));
        });
    };
    AddCardComponent.prototype.selectResult = function (index) {
        this.e1.nativeElement.querySelectorAll('.results-content')[index].style.background = '#B2EBF2';
        this.selectedResult = index;
        console.log("the selected result is " + this.selectedResult);
        this.e3.nativeElement.style.display = "block";
        this.e4.nativeElement.style.display = "block";
    };
    // this is for when the user selects one of the results and adds it to their places
    // we are going to add this place using our place service
    AddCardComponent.prototype.submitAdd = function () {
        var toAdd = {
            name: this.found[this.selectedResult].name,
            location: this.found[this.selectedResult].location.city,
            tags: this.tags
        };
        this.placeService.addPlace(toAdd)
            .subscribe(function (place) {
        });
        this.e2.nativeElement.style.display = "";
    };
    AddCardComponent.prototype.cancel = function () {
        this.e2.nativeElement.style.display = "";
    };
    AddCardComponent.prototype.addTag = function () {
        this.tags.push(this.tagName);
        this.e5.nativeElement.value = "";
    };
    AddCardComponent.prototype.addPlace = function (event) {
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
        core_2.ViewChild('cards'),
        __metadata("design:type", core_2.ElementRef)
    ], AddCardComponent.prototype, "e1", void 0);
    __decorate([
        core_2.ViewChild('cardWrap'),
        __metadata("design:type", core_2.ElementRef)
    ], AddCardComponent.prototype, "e2", void 0);
    __decorate([
        core_2.ViewChild('add'),
        __metadata("design:type", core_2.ElementRef)
    ], AddCardComponent.prototype, "e3", void 0);
    __decorate([
        core_2.ViewChild('tagForm'),
        __metadata("design:type", core_2.ElementRef)
    ], AddCardComponent.prototype, "e4", void 0);
    __decorate([
        core_2.ViewChild('tagInput'),
        __metadata("design:type", core_2.ElementRef)
    ], AddCardComponent.prototype, "e5", void 0);
    AddCardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-card',
            template: "<div #cardWrap class=\"card\">\n        <div #cards class=\"card-content\">\n            <button (click)=\"cancel()\"class=\"close\">&times;</button>\n            <form (submit)=\"submitSearch()\">\n                <input name=\"first\" type=\"text\" [(ngModel)]=\"name\" placeHolder=\"Name\"/><br>\n                <input name=\"second\" type=\"text\" [(ngModel)]=\"city\" placeHolder=\"Location\"/><br>\n                <input name=\"submit\" type=\"submit\" value=\"Search\"/>\n            </form>\n            <div class=\"results\">\n                <div class=\"results-content\" *ngFor=\"let result of found; let i = index\" (click)=\"selectResult(i)\">\n                    <span>{{ result.name }}</span><br>\n                    <span>{{ result.location.display_address }}</span><br>\n                    <a href=\"{{ result.url }}\">{{ result.url }}</a>\n                    \n                </div>\n                \n            </div>\n            <form #tagForm (submit)=\"addTag()\" style=\"display:none\">\n                <input #tagInput name=\"tagInput\" type=\"text\" [(ngModel)]=\"tagName\" placeHolder=\"tag (i.e. mexican, japanese)\" style=\"width:200px\"/>\n                <input name=\"tagSubmit\" type=\"submit\" value=\"Add Tag\"/>\n            </form>\n            <span *ngFor=\"let tag of tags\">#{{ tag }}&nbsp;&nbsp;</span>\n            <br>\n            <button #add (click)=\"submitAdd()\" style=\"display:none\">Add Place</button>\n            \n        </div>\n    </div>",
            styles: ["\n        .card {\n            display: none;\n            position: fixed;\n            z-index: 1;\n            left: 0;\n            top: 0;\n            width: 100%;\n            height: 100%;\n            overflow: auto;\n            background-color: rgba(0,0,0,0.5);\n        }\n        .card-content {\n            background-color: white;\n            margin: 15% auto;\n            padding: 20px;\n            width: 50%\n        }\n        .results-content {\n            color: black;\n            width: 100%;\n            background-color: #E0F7FA;\n            white-space: pre-wrap;    \n            white-space: -moz-pre-wrap; \n            white-space: -pre-wrap;    \n            white-space: -o-pre-wrap;  \n            word-wrap: break-word; \n            padding: 10px 15px 10px 15px;\n            margin-bottom: 20px;\n        }\n\n        .results-content:hover {\n            background-color: #B2EBF2;\n            cursor: pointer;\n            cursor: hand;\n        }\n\n        span {\n            color: black;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [place_service_1.PlaceService, yelpfusion_service_1.YelpFusionService])
    ], AddCardComponent);
    return AddCardComponent;
}());
exports.AddCardComponent = AddCardComponent;
//# sourceMappingURL=add-card.component.js.map