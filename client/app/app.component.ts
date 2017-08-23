import { Component } from '@angular/core';
import { PlaceService } from './services/place.service';

// marks class as Angular component
@Component({
    moduleId: module.id,
    selector: 'my-app',
    providers: [ PlaceService ],
    templateUrl: 'app.component.html'
})

export class AppComponent {}