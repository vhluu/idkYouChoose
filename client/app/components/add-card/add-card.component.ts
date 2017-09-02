import { Component } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { YelpFusionService } from '../../services/yelpfusion.service';
import { Place } from '../../../Place';
import { ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'add-card',
    template: `<div #cardWrap class="card">
        <div #cards class="card-content">
            <button (click)="cancel()"class="close">&times;</button>
            <form (submit)="submitSearch()">
                <input name="first" type="text" [(ngModel)]="name" placeHolder="Name"/><br>
                <input name="second" type="text" [(ngModel)]="city" placeHolder="Location"/><br>
                <input name="submit" type="submit" value="Search"/>
            </form>
            <div class="results">
                <div class="results-content" *ngFor="let result of found; let i = index" (click)="selectResult(i)">
                    <span>{{ result.name }}</span><br>
                    <span>{{ result.location.display_address }}</span><br>
                    <a href="{{ result.url }}">{{ result.url }}</a>
                    
                </div>
                
            </div>
            <form #tagForm (submit)="addTag()" style="display:none">
                <input #tagInput name="tagInput" type="text" [(ngModel)]="tagName" placeHolder="tag (i.e. mexican, japanese)" style="width:200px"/>
                <input name="tagSubmit" type="submit" value="Add Tag"/>
            </form>
            <span *ngFor="let tag of tags">#{{ tag }}&nbsp;&nbsp;</span>
            <br>
            <button #add (click)="submitAdd()" style="display:none">Add Place</button>
            
        </div>
    </div>`,
    styles: [`
        .card {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.5);
        }
        .card-content {
            background-color: white;
            margin: 15% auto;
            padding: 20px;
            width: 50%
        }
        .results-content {
            color: black;
            width: 100%;
            background-color: #E0F7FA;
            white-space: pre-wrap;    
            white-space: -moz-pre-wrap; 
            white-space: -pre-wrap;    
            white-space: -o-pre-wrap;  
            word-wrap: break-word; 
            padding: 10px 15px 10px 15px;
            margin-bottom: 20px;
        }

        .results-content:hover {
            background-color: #B2EBF2;
            cursor: pointer;
            cursor: hand;
        }

        span {
            color: black;
        }
    `]
})



export class AddCardComponent {
    @ViewChild('cards') e1:ElementRef;
    @ViewChild('cardWrap') e2:ElementRef;
    @ViewChild('add') e3:ElementRef;
    @ViewChild('tagForm') e4:ElementRef;
    @ViewChild('tagInput') e5:ElementRef;

    places: Place[];
    location: string;
    name: string;
    city: string;
    selectedCity: string;
    found: any;
    uniqueLocations: string [] = [];
    selectedResult: number;
    tags: string [] = [];
    tagName: string;

    constructor(private placeService:PlaceService, private yelpFusionService:YelpFusionService) {
       
    }


    // when adding a place, once we submit our form, then we call this method
    // it will get the search results and then display them for the user to select
    submitSearch() {
        // get the first string
        
        // get the second string
        console.log("first string is " + this.name);
        console.log("second string is " + this.city);
        this.yelpFusionService.getResults(this.name, this.city)
            .subscribe(found => {
                this.found = found.body.businesses;
                console.log("found " + JSON.stringify(this.found));
            });


    }

    selectResult(index) {
        this.e1.nativeElement.querySelectorAll('.results-content')[index].style.background = '#B2EBF2';
        this.selectedResult = index;
        console.log("the selected result is " + this.selectedResult);
        this.e3.nativeElement.style.display = "block";
        this.e4.nativeElement.style.display = "block";
    }

    // this is for when the user selects one of the results and adds it to their places
    // we are going to add this place using our place service
    submitAdd() {
        var toAdd = {
            name: this.found[this.selectedResult].name,
            location: this.found[this.selectedResult].location.city,
            tags: this.tags
        };
       this.placeService.addPlace(toAdd)
        .subscribe(place => {
           
        });
        this.e2.nativeElement.style.display = "";
    }

    cancel() {
        this.e2.nativeElement.style.display = "";
    }

    addTag() {
        this.tags.push(this.tagName);
        this.e5.nativeElement.value = "";
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