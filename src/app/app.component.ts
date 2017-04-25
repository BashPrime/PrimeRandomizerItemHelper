import { Component, Directive, ViewChild } from '@angular/core';
import { ItemLocationsService } from './item-locations/item-locations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ItemLocationsService]
})
export class AppComponent {
  title = 'app works!';
}
