import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class YelpFusionService {
    
    term: string;
    lat: any;
    long: any;
    location: string;
    
    constructor(private http:Http) {
        console.log('Yelp Fusion Service Initialized...');
        console.log("this is " + this);
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition);
        }
        else {
            console.log("Could not get current position");
        }
    }

    
    showPosition(position) {
        /*this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log("the latitude is " + this.lat);
        console.log("the longitude is " + this.long);*/
    }

    getResults(term, location) {
        var resultTerm = term.replace(' ', '+');
        console.log("the term is " + resultTerm);
        var resultLoc = location.replace(' ', '+');
        console.log("the location is " + resultLoc);
        
        return this.http.get('/yfapi/' + resultTerm + '/' + resultLoc)
        //return this.http.get('/api/search/' + resultTerm)
        .map(res => res.json());
    }

}