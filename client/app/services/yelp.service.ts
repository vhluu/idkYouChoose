import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YelpService {
    
    http : Http
    data : any
    token : any
    headers : Headers
    lat: any
    long: any
    constructor(@Inject(Http) http) {
        this.http = http;

        var resBody = this.getAccessToken('XIq9YBzVAMalw9bDoEVb9w', 'Bc1OYAu9us0KSA83YakwyiZVp2zIGtO5zOZQwjxfUE835eUCHXJfe5Mgn6sGhooQ');
        console.log(resBody);
        this.token = resBody["access_token"];
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.token);
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition);
        }
    }

    
    showPosition(position) {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log(this.lat);
        console.log(this.long);
    }


    getAccessToken(clientId, clientSecret) {
        // make post request to endpoint https://api.yelp.com/oauth2/token
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('grant_type', 'client_credentials');
        urlSearchParams.append('client_id', clientId);
        urlSearchParams.append('client_secret', clientSecret);
        let body = urlSearchParams.toString();

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('https://api.yelp.com/oauth2/token', body, { headers: headers})
        .map(res => res.json())
        .subscribe(data => this.data = data);
        console.log(this.data);
    }

    // we want to allow the user to enter the name and location or use current location
    // we then use this to make a get request to the yelp fusion api
    findPlace(searchTerm, locationString) {
        var params = "term=" + "&latitude=" + this.lat + "&longitude=" + this.long + "&open_now=true&limit=5";

        return this.http.get('https://api.yelp.com/v3/businesses/search?' + params, { headers: this.headers})
            .map(res => res.json());
    }

}