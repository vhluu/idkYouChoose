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
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    LoginComponent.prototype.fbLogin = function () {
        var _this = this;
        this.userService.fbLogin().then(function () {
            _this.router.navigate(['/dashboard']);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-login',
            template: "\n<div class=\"container\">\n    <div class=\"header\">\n        <h2>Can't Decide Where to Eat??</h2>\n    </div>\n    <div style=\"color: black;\">\n        <p>Let us help!</p>\n        <p>With idkYouChoose, you can: </p>\n        <ul style=\"text-align:left; font-size:16px\">\n            <li>Create a personal list of places you like to eat at</li>\n            <li>Add tags so that you can filter places based on your current preferences</li>\n            <li>Generate a random place from your list so that you don't have to decide!</li>\n        </ul>\n\n        <button style=\"background:white; margin-top:20px\" (click)=\"fbLogin()\"> Login using Facebook</button>\n    </div>\n</div>\n",
            styles: ["\n    .container {\n       width: 525px;\n       text-align: center;\n       height:400px\n    }\n\n    p {\n        font-size: 20px;\n        margin-top: 15px;\n    }\n\n    li {\n        margin-bottom:10px;\n    }\n    \n    "],
            providers: [user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map