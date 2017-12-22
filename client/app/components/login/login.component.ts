import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    template: `
<div class="container">
    <div class="header">
        <h2>Can't Decide Where to Eat??</h2>
    </div>
    <div style="color: black;">
        <p>Let us help!</p>
        <p>With idkYouChoose, you can: </p>
        <ul style="text-align:left; font-size:16px">
            <li>Create a personal list of places you like to eat at</li>
            <li>Add tags so that you can filter places based on your current preferences</li>
            <li>Generate a random place from your list so that you don't have to decide!</li>
        </ul>

        <button style="background:white; margin-top:20px" (click)="fbLogin()"> Login using Facebook</button>
    </div>
</div>
`,
    styles: [`
    .container {
       width: 525px;
       text-align: center;
       height:400px
    }

    p {
        font-size: 20px;
        margin-top: 15px;
    }

    li {
        margin-bottom:10px;
    }
    
    `],
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