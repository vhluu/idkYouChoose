import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'navi-menu',
    template: `<div>
      <h4>Navigation</h4>
      <ul>
        <li>Choose Place
        <li>My Places
      </ul>
    </div>`,
    styles: [`
        ul {
          list-style-type: none;
          padding-left: 30px;
        }

        li:first-child {
          
        }

        li {
          margin-bottom:10px;
        }

        li:hover {
          cursor: pointer;
        }

        div {
          background: white;
          color: black;
          width: 200px;
          height: 400px;
        }
 
        h4 {
          text-align: center;
          padding-top: 20px;
          padding-bottom: 5px;
        }
    `]
})



export class NaviMenuComponent {


    constructor() {
       
    }

}