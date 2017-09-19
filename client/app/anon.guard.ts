import { Injectable } from '@angular/core';
import { CanActivate, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable()
export class AnonGuard implements CanActivate {
    private promise: Promise<boolean>;
    constructor(private userService: UserService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.promise = new Promise((resolve, reject) => {
            // navigates to dashboard if the user is logged in through fb
            this.userService.isLoggedIn() 
                .then(() => {
                    this.router.navigate(['/dashboard']);
                    reject(false);
                })
                .catch(() => {
                    resolve(true);
                });
        });
        return this.promise;

    }
}