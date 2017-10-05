import { Component, ComponentFactoryResolver } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { UserService } from '../../services/user.service';
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'filter-menu',
    template: `
    <div>
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
      <button (click)="resetFilters()">Reset</button>
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
    `],
    providers: [ UserService ]
})



export class FilterMenuComponent {
    @ViewChild('first') firstDiv:ElementRef;
    @ViewChild('second') secondDiv:ElementRef;

    
    selectTags: string[] = [""];
    toShow: string[] = [];
    toRemove: string[] = [];

    currentUser: any = { fullName : ''};


    constructor(private userService:UserService, private resolver: ComponentFactoryResolver, private placeService:PlaceService) {
 
    //this.firstTags.push('');
       //this.firstTags.push('value1');
    //   this.firstTags.push('value2');
     
    
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .then(profile => {
                console.log(profile);
                this.currentUser = profile;
                this.placeService.getDistinctTags(this.currentUser.user_id, "San Diego")
                .subscribe(distinct => {
                    console.log(distinct);
                    for (var i = 0; i < distinct.length; i++) {
                        this.selectTags.push(distinct[i]);
                    }
                });
            })
            .catch(() => this.currentUser = {});   
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

    resetFilters() {
        this.toShow = [];
        this.toRemove = [];
        this.firstDiv.nativeElement.querySelector('select').value = "";
        this.secondDiv.nativeElement.querySelector('select').value = "";
    }
}