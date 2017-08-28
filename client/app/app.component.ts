import { Component } from '@angular/core';
import { PlaceService } from './services/place.service';
import { YelpService } from './services/yelp.service';

// marks class as Angular component
@Component({
    moduleId: module.id,
    selector: 'my-app',
    providers: [ PlaceService, YelpService ],
    templateUrl: 'app.component.html'
})

export class AppComponent {}