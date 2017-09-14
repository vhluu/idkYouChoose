import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { PlaceService } from '../../services/place.service';
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
                <option *ngFor="let tag of selectTags" value="{{ tag }}">{{ tag }}</option>
            </select>
        </div>
        <div *ngFor="let showing of toShow" style="display:flex; flex-direction:row">  
            <select (change)="show($event.target.value)">
                <option *ngFor="let tag of selectTags" value="{{ tag }}">{{ tag }}</option>
            </select>
        </div>

      </div>
      <h4>I'm not feeling:</h4>
      <div #second>
        <div style="display:flex; flex-direction:row">
            <select (change)="remove($event.target.value)">
                <option *ngFor="let tag of selectTags" value="{{ tag }}">{{ tag }}</option>
            </select>
        </div>
        <div *ngFor="let removing of toRemove" style="display:flex; flex-direction:row">  
            <select (change)="remove($event.target.value)">
                <option *ngFor="let tag of selectTags" value="{{ tag }}">{{ tag }}</option>
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

    
    selectTags: string[] = [""];
    toShow: string[] = [];
    toRemove: string[] = [];


    constructor(private resolver: ComponentFactoryResolver, private placeService:PlaceService) {
      this.placeService.getDistinctTags("San Diego")
            .subscribe(distinct => {
                for (var i = 0; i < distinct.length; i++) {
                    this.selectTags.push(distinct[i]);
                }
            });
    //this.firstTags.push('');
       //this.firstTags.push('value1');
    //   this.firstTags.push('value2');
     
    
    }

    show(value) {
        if (value != "") this.toShow.push(value);
        //console.log("toShow is " + this.toShow);
    }

    remove(value) {
        if (value != "") this.toRemove.push(value);
        //console.log("toRemove is " + this.toRemove);
    }

    getShowTags() {
        var selects = this.firstDiv.nativeElement.querySelectorAll('select');
        var str = "";

        for (var i = 0; i < selects.length; i++) {
            if (selects[i].value != "" && str.indexOf(selects[i].value) == -1) {
                str = str + selects[i].value + ',';
            }
        }

        if (str.substring(str.length-1) == ',') {
            str = str.slice(0, -1);
        }
        console.log("show tags are " + str);
        return str;
    }

    getRemoveTags() {
        var selects = this.secondDiv.nativeElement.querySelectorAll('select');
        var str = "";
        
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].value != "" && str.indexOf(selects[i].value) == -1) {
                str = str + selects[i].value + ',';
            }
        }

        if (str.substring(str.length-1) == ',') {
            str = str.slice(0, -1);
        }
        console.log("remove tags are " + str);
        return str;
    }
}