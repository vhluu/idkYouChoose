import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

declare const FB:any;

@Injectable()
export class UserService {
    constructor(private http: AuthHttp) {
        // initializing library that is used to communicate with facebook
        FB.init({
          appId      : '171638416735699',
          status     : false, // the SDK will attempt to get info about the current user immediately after init
          cookie     : false,  // enable cookies to allow the server to access
          // the session
          xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
          version    : 'v2.8' // use graph api version 2.5
        });
      }
    
      fbLogin() {
        return new Promise((resolve, reject) => {
          // try to get user's data. will open fb login dialog if ser is not logged in 
          FB.login(result => { // result contains info about whether user is logged in & allowed access
            if (result.authResponse) {
              // try to login user in backend
              return this.http.post('http://localhost:3000/api/auth/facebook', {access_token: result.authResponse.accessToken})
                  .toPromise() // converts an observable to a promise
                  // then and catch will execute when the promise is fulfilled or rejected
                  .then(response => { 
                    var token = response.headers.get('x-auth-token');
                    if (token) {
                      localStorage.setItem('idToken', token);
                    }
                    resolve(response.json()); // returns user data
                  })
                  .catch(() => reject());
            } else {
              reject(); // fails
            }

          }, {scope: 'public_profile,email,user_friends'}) // list of permissions to request from user
        });
      }
    
      // deletes token from local storage
      logout() {
        localStorage.removeItem('idToken');
      }
    

      // boolean from whether user is logged in or not
      isLoggedIn() {
        return new Promise((resolve, reject) => {
          this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
        });
      }
    
      getCurrentUser() {
        return new Promise((resolve, reject) => {
          return this.http.get('http://localhost:3000/api/auth/me').toPromise().then(response => {
            resolve(response.json());
          }).catch(() => reject());
        });
      }

}