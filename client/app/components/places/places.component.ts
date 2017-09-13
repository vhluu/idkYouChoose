import { Component } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { YelpFusionService } from '../../services/yelpfusion.service';
import { Place } from '../../../Place';
import { ViewChild, ElementRef } from '@angular/core';
declare var $: any;


@Component({
    moduleId: module.id,
    selector: 'places',
    template: `
    <div #adding>
        <button (click)="openCard()">+</button>
        <add-card #myCards></add-card>
    </div>
    <div #generateDiv>
        <select #selectCity (onchange)="switchCity()">
            <option *ngFor="let loc of uniqueLocations" value="{{ loc }}">{{ loc }}</option>
        </select>
        <filter-menu></filter-menu>
        <button class="generate" (click)="generate()">idk you choose!</button>
    </div>
    <div #myPlaces style="display:flex; margin-left: 50px">
        <div *ngFor="let place of filteredPlaces; let i = index" class="item" [class.active]="i==0">
            {{ place.name }}
        </div>
        <button #next (click)="changeItem()"><i class="material-icons">refresh</i></button>
    </div>`,
    styles: [`
        .generate {
            margin-top: 20px;
            background: white;
            color: black;
            border: none;
            outline: none;
        }
    `]

})



export class PlacesComponent {
    @ViewChild('myPlaces') e1:ElementRef;
    @ViewChild('selectCity') e2:ElementRef;
    @ViewChild('adding') e3:ElementRef;
    @ViewChild('generateDiv') e4:ElementRef;

    uniqueLocations: string[];
    places: Place[];
    filteredPlaces: string[];
    location: string;
    showing: number;
    name: string;
    city: string;
    selectedCity: string;
    found: any;

    constructor(private placeService:PlaceService, private yelpFusionService:YelpFusionService) {
        this.placeService.getPlaces()
            .subscribe(places => {
                /*var j, x, i;
                for (i = places.length; i; i--) {
                    j = Math.floor(Math.random() * i);
                    x = places[i - 1];
                    places[i - 1] = places[j];
                    places[j] = x;
                }*/
                var i;
                console.log(places);
                this.places = places;
                this.uniqueLocations = [];
                this.showing = 0;

                for (i = 0; i < this.places.length; i++) {
                    if (this.uniqueLocations.indexOf(this.places[i].location) == -1) {
                        this.uniqueLocations.push(this.places[i].location);
                    }
                }
                console.log("uniqueLocations is " + this.uniqueLocations);

                //this.selectedCity = this.e2.nativeElement.querySelector('[selected="selected"]').value;
            });
        
           
        // we want our place initially based on our current location
     
    }

    openCard() {
       console.log("e3 is " + JSON.stringify(this.e3.nativeElement.querySelector('div')));
       this.e3.nativeElement.querySelector('div').style.display = "block";
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

    generate() {
        console.log(JSON.stringify(this.e4));
        var show = this.e4.nativeElement.querySelector('filter-menu').getShowTags();
       // var remove = this.fMenu.nativeElement.getRemoveTags();
       // var temp = [];
        // maybe randomly choose one of the tags and then one place in tags
       // var tagIndex = Math.random() * show.length;
       // var chosenTag = show[tagIndex];


        this.placeService.getTaggedPlaces('mexican,japanese')
        .subscribe(places => {
            console.log(places);
            for (var j = 0; j < places.length; j++) {
                //temp.push(places[j]);
            }
        });

    }



    

}