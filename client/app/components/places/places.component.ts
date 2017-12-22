import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { YelpFusionService } from '../../services/yelpfusion.service';
import { Place } from '../../../Place';
import { ViewChild, ElementRef } from '@angular/core';
import { FilterMenuComponent } from '../filter-menu/filter-menu.component';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var $: any;


@Component({
    moduleId: module.id,
    selector: 'places',
    template: `
<div class="container">
    <div class="header">
        <h2>idkYouChoose</h2>
    </div>
    <div style="color: black;">
        <div style="margin-left:20px; margin-top:10px">Hello {{ currentUser.fullName }}!
        <button style="float:right; background:white; margin-right:10px" (click)="logOut()">LOG OUT</button>
        </div>
        
        <div style="margin-left:10px; display:flex; flex-direction:row; margin-top:60px; margin-bottom:70px">
            <div #adding>
                <button style="background:white; margin-right:10px;" (click)="openCard()">Add Place</button>
                <add-card #myCards></add-card>
            </div>
            <div #generateDiv>
                Filter by Location:<br>
                <select #selectCity (onchange)="switchCity()">
                    <option *ngFor="let loc of uniqueLocations" value="{{ loc }}">{{ loc }}</option>
                </select>
                <filter-menu #fm></filter-menu>
                <button class="generate" (click)="generate()">idk you choose!</button>
            </div>
            <div #myPlaces style="display:flex; margin-left: 50px">
                <div class="item">
                    {{ filteredPlace }}
                </div>
                <button #next (click)="changeItem()"><i class="material-icons">refresh</i>Try Again</button>
            </div>
        </div>
</div>`,
    styles: [`
        .generate {
            margin-top: 20px;
            background: white;
            color: black;
            border: none;
            outline: none;
        }
    `],
    providers: [ UserService ]

})



export class PlacesComponent {
    @ViewChild('myPlaces') e1:ElementRef;
    @ViewChild('selectCity') e2:ElementRef;
    @ViewChild('adding') e3:ElementRef;
    @ViewChild('generateDiv') e4:ElementRef;
    @ViewChild(FilterMenuComponent) private e5: FilterMenuComponent;

    uniqueLocations: string[];
    places: Place[];
    filteredPlace: string;
    location: string;
    showing: number;
    name: string;
    city: string;
    selectedCity: string;
    found: any;
    
    show: string;
    remove: string;
    fP: any;
    prev: number;

    currentUser: any = { fullName : ''};

    constructor(private userService:UserService, private placeService:PlaceService, private yelpFusionService:YelpFusionService, private router:Router) {
        
           
        // we want our place initially based on our current location
     
    }

    openCard() {
       console.log("e3 is " + JSON.stringify(this.e3.nativeElement.querySelector('div')));
       this.e3.nativeElement.querySelector('div').style.display = "block";
    }

    changeItem() {
        var rand;
        if (this.fP.length > 1) {
            do {
                rand = Math.floor(Math.random() * this.fP.length);
            } while (rand == this.prev);
            this.prev = rand;
        }
        
        console.log(this.prev);
        this.filteredPlace = this.fP[this.prev].name;
        
    }

    switchCity() {
        console.log("switching");
    }

    generate() {
        this.show = this.e5.getShowTags();
        this.remove = this.e5.getRemoveTags();
       
        this.placeService.getTaggedPlaces(this.currentUser.user_id, this.show + '-' + this.remove)
        .subscribe(places => {
            this.fP = places;
            console.log(this.fP);
            console.log(this.fP.length);
            this.prev = Math.floor(Math.random() * this.fP.length);
            
            console.log(this.prev);
            this.filteredPlace = this.fP[this.prev].name;
            
        });
    }

    
    ngOnInit() {
        this.userService.getCurrentUser()
            .then(profile => {
                console.log(profile);
                this.currentUser = profile;

                this.placeService.getPlaces(this.currentUser.user_id)
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
                    // TODO: LOOK THROUGH THIS. MAYBE ADD ROUTE TO GET UNIQUE LOCATIONS
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
            })
            .catch(() => this.currentUser = {});
        
            
        
    }

    logOut() {
        this.currentUser = { fullName : ''}; 
        this.userService.logout();
        this.router.navigate(['/welcome']);
    }

    

}