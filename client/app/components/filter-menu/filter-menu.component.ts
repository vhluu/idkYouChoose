import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'filter-menu',
    template: `
    <div #first>
      <h4>I'm feeling:</h4>
      <div #first>
        <div style="display:flex; flex-direction:row">
            <select (change)="show($event.target.value)">
                <option *ngFor="let tag of firstTags" value="{{ tag }}">{{ tag }}</option>
            </select>
        </div>
        <div *ngFor="let showing of toShow" style="display:flex; flex-direction:row">  
            <select (change)="show($event.target.value)">
                <option *ngFor="let tag of firstTags" value="{{ tag }}">{{ tag }}</option>
            </select>
        </div>

      </div>
      <h4>I'm not feeling:</h4>
      <div #second>
        <div style="display:flex; flex-direction:row">
            <select (change)="remove($event.target.value)">
                <option *ngFor="let tag of secondTags" value="{{ tag }}">{{ tag }}</option>
            </select>
        </div>
        <div *ngFor="let removing of toRemove" style="display:flex; flex-direction:row">  
            <select (change)="remove($event.target.value)">
                <option *ngFor="let tag of secondTags" value="{{ tag }}">{{ tag }}</option>
            </select>
        </div>
      </div>
    </div>`,
    styles: [`
        div {
          background: inherit;
          color: white
          width: 200px;
        }
 
        h4 {
          padding-top: 20px;
          padding-bottom: 5px;
        }

        select {
            margin-bottom: 5px;
            border: none;
            outline: none;
        }
    `]
})



export class FilterMenuComponent {
    @ViewChild('first') firstDiv:ElementRef;
    @ViewChild('second') secondDiv:ElementRef;

    firstTags: string[] = [];
    secondTags: string[] = [];
    toShow: string[] = [];
    toRemove: string[] = [];


    constructor(private resolver: ComponentFactoryResolver) {
       this.firstTags.push('');
       this.firstTags.push('value1');
       this.firstTags.push('value2');
       console.log(this.firstTags);
       this.secondTags = ['', 'value1', 'value2'];
    }

    show(value) {
        this.toShow.push(value);
        console.log("toShow is " + this.toShow);
    }

    remove(value) {
        this.toRemove.push(value);
        console.log("toRemove is " + this.toRemove);
    }

    getShowTags() {
        return this.toShow;
    }

    getRemoveTags() {
        return this.toRemove;
    }
}