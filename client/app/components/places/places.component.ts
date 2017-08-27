import { Component } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { YelpService } from '../../services/yelp.service';
import { Place } from '../../../Place';
import { ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'places',
    template: `<form (submit)="addPlace($event)">
    <input name="first" type="text" [(ngModel)]="name" placeHolder="Name"/>
    <input name="second" type="text" [(ngModel)]="city" placeHolder="City"/>
    <input name="submit" type="submit" value="Submit"/>
</form>
<select #selectCity (onchange)="switchCity()">
    <option *ngFor="let loc of uniqueLocations; " value="{{ loc }}" selected="i==0">{{ loc }}</option>
</select>
<div #myPlaces style="display:flex">
    <div *ngFor="let place of places; let i = index" class="item" [class.active]="i==0">
        {{ place.name }}
    </div>
    <button #next (click)="changeItem()"><i class="material-icons">refresh</i></button>
</div>`,
})



export class PlacesComponent {
    @ViewChild('myPlaces') e1:ElementRef;

    uniqueLocations: string[];
    places: Place[];
    location: string;
    showing: number;
    name: string;
    city: string;
    selectedCity: string;

    constructor(private placeService:PlaceService, private yelpService:YelpService) {
        this.placeService.getPlaces()
            .subscribe(places => {
                var j, x, i;
                for (i = places.length; i; i--) {
                    j = Math.floor(Math.random() * i);
                    x = places[i - 1];
                    places[i - 1] = places[j];
                    places[j] = x;
                }
                console.log(places);
                this.places = places;
                this.uniqueLocations = [];
                this.showing = 0;

                for (i = 0; i < this.places.length; i++) {
                    if (this.uniqueLocations.indexOf(this.places[i].location) == -1) {
                        this.uniqueLocations.push(this.places[i].location);
                    }
                }
                
                console.log(this.e1.nativeElement.querySelector('[selected="true"]'));
                this.selectedCity = this.e1.nativeElement.querySelector('[selected="true"]').value;
                console.log(this.selectedCity);
                console.log(this.uniqueLocations);

            });
        
        // we want our place initially based on our current location
            

        
    }

    // when adding a place, once we submit our form, then we call this method
    // it will get the search results and then display them for the user to select
    submitSearch() {
        // get the first string

        // get the second string

        console.log(this.yelpService.findPlace());

        // we are going to display the results to the user

    }

    // this is for when the user selects one of the results and adds it to their places
    // we are going to add this place using our place service
    submitAdd() {
        var toAdd = {

        };
       this.placeService.addPlace(toAdd);
    }

    ngAfterViewInit() {
        console.log(this.e1.nativeElement);
    }

    changeItem() {
        if(!((this.showing + 1) >= this.places.length)) {
            this.e1.nativeElement.querySelectorAll('div')[this.showing].className = "item";
            this.showing++;
            this.e1.nativeElement.querySelectorAll('div')[this.showing].className = "item active";
        }  
    }

    switchCity() {
        console.log("switching");
    }

    addPlace(event) {
        event.preventDefault();
        console.log(this.city);
        console.log(this.name);
        var newPlace = {
            name: this.name,
            location: this.city
        };

        this.placeService.addPlace(newPlace) 
            .subscribe(place => {
                this.places.push(place);
                this.name = '';
                this.city = '';
            });
        if (this.uniqueLocations.indexOf(this.city) == -1) {
            this.uniqueLocations.push(this.city);
        }
        console.log(this.uniqueLocations);
    }



    

}