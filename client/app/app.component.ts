import { Component } from '@angular/core';
import { PlaceService } from './services/place.service';
import { YelpFusionService } from './services/yelpfusion.service';
import { UserService } from './services/user.service';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    providers: [ PlaceService, YelpFusionService, UserService ],
    templateUrl: 'app.component.html'
})

export class AppComponent {}