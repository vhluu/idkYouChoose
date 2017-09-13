import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PlaceService {

    // inject Http module 
    constructor(private http:Http) {
        console.log('Place Service Initialized...');
    }

    getPlaces() {
        return this.http.get('/api/places') // make get request to our api
            .map(res => res.json());
    }

    getTaggedPlaces(tagName) {
        return this.http.get('/api/places/' + tagName)
            .map(res => res.json());
    }

    addPlace(newPlace) {
        console.log("new place is " + newPlace);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // post request. we want the place as a string
        return this.http.post('/api/place', JSON.stringify(newPlace), { headers: headers })
            .map(res => res.json());
    }

    deletePlace(id) {
        // delete request
        return this.http.delete('/api/place/' + id)
            .map(res => res.json());
    }

    updateStatus(place) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // put request
        return this.http.put('/api/place/' + place._id, JSON.stringify(place), { headers: headers })
            .map(res => res.json());
    }
}