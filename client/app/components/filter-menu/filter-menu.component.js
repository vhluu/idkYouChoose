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
var core_2 = require("@angular/core");
var place_service_1 = require("../../services/place.service");
var FilterMenuComponent = (function () {
    function FilterMenuComponent(resolver, placeService) {
        var _this = this;
        this.resolver = resolver;
        this.placeService = placeService;
        this.selectTags = [""];
        this.toShow = [];
        this.toRemove = [];
        this.placeService.getDistinctTags("San Diego")
            .subscribe(function (distinct) {
            for (var i = 0; i < distinct.length; i++) {
                _this.selectTags.push(distinct[i]);
            }
        });
        //this.firstTags.push('');
        //this.firstTags.push('value1');
        //   this.firstTags.push('value2');
    }
    FilterMenuComponent.prototype.show = function (value) {
        if (value != "")
            this.toShow.push(value);
        //console.log("toShow is " + this.toShow);
    };
    FilterMenuComponent.prototype.remove = function (value) {
        if (value != "")
            this.toRemove.push(value);
        //console.log("toRemove is " + this.toRemove);
    };
    FilterMenuComponent.prototype.getShowTags = function () {
        var selects = this.firstDiv.nativeElement.querySelectorAll('select');
        var str = "";
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].value != "" && str.indexOf(selects[i].value) == -1) {
                str = str + selects[i].value + ',';
            }
        }
        if (str.substring(str.length - 1) == ',') {
            str = str.slice(0, -1);
        }
        console.log("show tags are " + str);
        return str;
    };
    FilterMenuComponent.prototype.getRemoveTags = function () {
        var selects = this.secondDiv.nativeElement.querySelectorAll('select');
        var str = "";
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].value != "" && str.indexOf(selects[i].value) == -1) {
                str = str + selects[i].value + ',';
            }
        }
        if (str.substring(str.length - 1) == ',') {
            str = str.slice(0, -1);
        }
        console.log("remove tags are " + str);
        return str;
    };
    FilterMenuComponent.prototype.resetFilters = function () {
        this.toShow = [];
        this.toRemove = [];
        this.firstDiv.nativeElement.querySelector('select').value = "";
        this.secondDiv.nativeElement.querySelector('select').value = "";
    };
    __decorate([
        core_2.ViewChild('first'),
        __metadata("design:type", core_2.ElementRef)
    ], FilterMenuComponent.prototype, "firstDiv", void 0);
    __decorate([
        core_2.ViewChild('second'),
        __metadata("design:type", core_2.ElementRef)
    ], FilterMenuComponent.prototype, "secondDiv", void 0);
    FilterMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'filter-menu',
            template: "\n    <div>\n      <h4>I'm feeling:</h4>\n      <div #first>\n        <div style=\"display:flex; flex-direction:row\">\n            <select (change)=\"show($event.target.value)\">\n                <option *ngFor=\"let tag of selectTags\" value=\"{{ tag }}\">{{ tag }}</option>\n            </select>\n        </div>\n        <div *ngFor=\"let showing of toShow\" style=\"display:flex; flex-direction:row\">  \n            <select (change)=\"show($event.target.value)\">\n                <option *ngFor=\"let tag of selectTags\" value=\"{{ tag }}\">{{ tag }}</option>\n            </select>\n        </div>\n\n      </div>\n      <h4>I'm not feeling:</h4>\n      <div #second>\n        <div style=\"display:flex; flex-direction:row\">\n            <select (change)=\"remove($event.target.value)\">\n                <option *ngFor=\"let tag of selectTags\" value=\"{{ tag }}\">{{ tag }}</option>\n            </select>\n        </div>\n        <div *ngFor=\"let removing of toRemove\" style=\"display:flex; flex-direction:row\">  \n            <select (change)=\"remove($event.target.value)\">\n                <option *ngFor=\"let tag of selectTags\" value=\"{{ tag }}\">{{ tag }}</option>\n            </select>\n        </div>\n      </div>\n      <button (click)=\"resetFilters()\">Reset</button>\n    </div>",
            styles: ["\n        div {\n          background: inherit;\n          color: white\n          width: 200px;\n        }\n \n        h4 {\n          padding-top: 20px;\n          padding-bottom: 5px;\n        }\n\n        select {\n            margin-bottom: 5px;\n            border: none;\n            outline: none;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver, place_service_1.PlaceService])
    ], FilterMenuComponent);
    return FilterMenuComponent;
}());
exports.FilterMenuComponent = FilterMenuComponent;
//# sourceMappingURL=filter-menu.component.js.map