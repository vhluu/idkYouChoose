import { Injectable } from '@angular/core';
import { CanActivate, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private promise: Promise<boolean>;
    constructor(private userService: UserService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.promise = new Promise((resolve, reject) => {
            // navigates to welcome if the user isn't logged in through fb
            this.userService.isLoggedIn() 
                .then(() => {
                    resolve(true);
                })
                .catch(() => { 
                    this.router.navigate(['/welcome']);
                    reject(false);
                });
        });
        return this.promise;

    }
}