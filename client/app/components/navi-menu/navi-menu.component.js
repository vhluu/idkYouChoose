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
var NaviMenuComponent = (function () {
    function NaviMenuComponent() {
    }
    NaviMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navi-menu',
            template: "<div>\n      <h4>Navigation</h4>\n      <ul>\n        <li (click)=\"choosePlace()\">Choose Place</li>\n        <li (click)=\"myPlaces()\">My Places</li>\n      </ul>\n    </div>",
            styles: ["\n        ul {\n          list-style-type: none;\n          padding-left: 30px;\n        }\n\n        li:first-child {\n          \n        }\n\n        li {\n          margin-bottom:10px;\n        }\n\n        li:hover {\n          cursor: pointer;\n        }\n\n        div {\n          background: white;\n          color: black;\n          width: 200px;\n          height: 400px;\n        }\n \n        h4 {\n          text-align: center;\n          padding-top: 20px;\n          padding-bottom: 5px;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [])
    ], NaviMenuComponent);
    return NaviMenuComponent;
}());
exports.NaviMenuComponent = NaviMenuComponent;
//# sourceMappingURL=navi-menu.component.js.map