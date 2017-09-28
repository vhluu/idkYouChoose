"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var places_component_1 = require("./components/places/places.component");
var add_card_component_1 = require("./components/add-card/add-card.component");
var navi_menu_component_1 = require("./components/navi-menu/navi-menu.component");
var filter_menu_component_1 = require("./components/filter-menu/filter-menu.component");
var login_component_1 = require("./components/login/login.component");
var app_routing_module_1 = require("./app.routing.module");
var common_1 = require("@angular/common");
var user_service_1 = require("./services/user.service");
function getAuthHttp(http) {
    return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig({
        headerName: 'x-auth-token',
        noTokenScheme: true,
        noJwtError: true,
        globalHeaders: [{ 'Accept': 'application/json' }],
        tokenGetter: (function () { return localStorage.getItem('idToken'); }),
    }), http);
}
exports.getAuthHttp = getAuthHttp;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, app_routing_module_1.AppRoutingModule],
            declarations: [app_component_1.AppComponent, places_component_1.PlacesComponent, add_card_component_1.AddCardComponent, navi_menu_component_1.NaviMenuComponent,
                filter_menu_component_1.FilterMenuComponent, login_component_1.LoginComponent],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, user_service_1.UserService, { provide: angular2_jwt_1.AuthHttp, useFactory: getAuthHttp, deps: [http_1.Http] }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map