import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http} from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlacesComponent } from './components/places/places.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { NaviMenuComponent } from './components/navi-menu/navi-menu.component';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { UserService } from './services/user.service';


export function getAuthHttp(http: Http) {
    return new AuthHttp(new AuthConfig({
      headerName: 'x-auth-token',
      noTokenScheme: true,
      noJwtError: true,
      globalHeaders: [{'Accept': 'application/json'}],
      tokenGetter: (() => localStorage.getItem('idToken')),
    }), http);
  }

@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule, AppRoutingModule ],
    declarations: [ AppComponent, PlacesComponent, AddCardComponent, NaviMenuComponent,
        FilterMenuComponent, LoginComponent],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}, UserService, {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]}],
    bootstrap: [ AppComponent ]
})

export class AppModule {}