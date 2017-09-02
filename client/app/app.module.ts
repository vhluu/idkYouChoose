import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlacesComponent } from './components/places/places.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { NaviBarComponent } from './components/navi-bar/navi-bar.component';
@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule ],
    declarations: [ AppComponent, PlacesComponent, AddCardComponent, NaviBarComponent],
    bootstrap: [ AppComponent ]
})

export class AppModule {}