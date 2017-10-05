import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class PlaceService {

    // inject Http module 
    constructor(private http:Http) {
        console.log('Place Service Initialized...');
    }

    getPlaces(id) {
        console.log('user id is ' + id);
        return this.http.get('/api/user/' + id + '/places') // make get request to our api
            .map(res => res.json());
    }

    getTaggedPlaces(id, tagName) {
        return this.http.get('/api/user/' + id + '/places/' + tagName)
            .map(res => res.json());
    }

    // get distinct tags for a specific location
    getDistinctTags(id, loc) {
        return this.http.get('/api/user/' + id + '/places/' + loc + '/tags')
            .map(res => res.json());
    }

    // we have to be professional so drin/p isnt affliated with our org
    // unique pledging experience
    addPlace(id, newPlace) {
        console.log("new place is " + newPlace);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // post request. we want the place as a string
        return this.http.put('/api/user/' + id + '/places', JSON.stringify(newPlace), { headers: headers })
            .map(res => res.json());
    }

    deletePlace(id, pid) {
        // delete request
        return this.http.delete('/api/user/' + id + '/place/' + pid)
            .map(res => res.json());
    }

    updatePlace(id, place) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // put request
        return this.http.put('/api/user/' + id + '/place/' + place.pid, JSON.stringify(place), { headers: headers })
            .map(res => res.json());
    }
}