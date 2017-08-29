import { Component } from '@angular/core';
import { PlaceService } from './services/place.service';
import { YelpFusionService } from './services/yelpfusion.service';

// marks class as Angular component
@Component({
    moduleId: module.id,
    selector: 'my-app',
    providers: [ PlaceService, YelpFusionService ],
    templateUrl: 'app.component.html'
})

export class AppComponent {}