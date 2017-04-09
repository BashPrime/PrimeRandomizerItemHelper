import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ItemLocationsService } from './item-locations.service';

@Component({
  selector: 'item-locations',
  templateUrl: './item-locations.component.html',
  providers: [ItemLocationsService]
})
export class ItemLocationsComponent {
  private itemLocations: Observable<Array<any>>;
  constructor(private locationsService: ItemLocationsService) {
    this.itemLocations = locationsService.getItemLocations();
  }
}
