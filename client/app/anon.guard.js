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
var router_1 = require("@angular/router");
var user_service_1 = require("./services/user.service");
var AnonGuard = (function () {
    function AnonGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AnonGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            // navigates to dashboard if the user is logged in through fb
            _this.userService.isLoggedIn()
                .then(function () {
                console.log('user is logged in');
                _this.router.navigate(['/dashboard']);
                reject(false);
            })
                .catch(function () {
                console.log('user not logged in');
                resolve(true);
            });
        });
        return this.promise;
    };
    AnonGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
    ], AnonGuard);
    return AnonGuard;
}());
exports.AnonGuard = AnonGuard;
//# sourceMappingURL=anon.guard.js.map