import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    template: `
<h2>Welcome page</h2>
<a class="btn btn-social btn-facebook" (click)="fbLogin()">
    <span class="fa fa-facebook"></span>  Login using Facebook
</a>`,
    styles: [``],
    providers: [ UserService ]
})



export class LoginComponent {


    constructor(private userService:UserService, private router:Router) {
       
    }

    fbLogin() {
        this.userService.fbLogin().then(() => {
            this.router.navigate(['/dashboard']);
        }); 
    }

}