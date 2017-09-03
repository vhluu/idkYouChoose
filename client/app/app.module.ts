import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlacesComponent } from './components/places/places.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { NaviMenuComponent } from './components/navi-menu/navi-menu.component';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule ],
    declarations: [ AppComponent, PlacesComponent, AddCardComponent, NaviMenuComponent,
        FilterMenuComponent],
    bootstrap: [ AppComponent ]
})

export class AppModule {}