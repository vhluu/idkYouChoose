"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./auth.guard");
var anon_guard_1 = require("./anon.guard");
var login_component_1 = require("./components/login/login.component");
var places_component_1 = require("./components/places/places.component");
var appRoutes = [
    {
        path: 'welcome',
        component: login_component_1.LoginComponent,
        canActivate: [anon_guard_1.AnonGuard]
    },
    {
        path: 'dashboard',
        component: places_component_1.PlacesComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: [
                auth_guard_1.AuthGuard,
                anon_guard_1.AnonGuard
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.module.js.map