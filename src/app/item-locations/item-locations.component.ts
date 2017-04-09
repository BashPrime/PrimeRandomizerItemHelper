import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ItemLocationsService } from './item-locations.service';

@Component({
    selector: 'item-locations',
    templateUrl: './item-locations.component.html',
    styleUrls: ['item-locations.css'],
    providers: [ItemLocationsService]
})
export class ItemLocationsComponent {
    public itemLocations: Object;
    public areaKeys: Array<any>;
    constructor(private locationsService: ItemLocationsService) {
        this.itemLocations = {};
        this.buildItemLocations();
    }

    buildItemLocations(): void {
        this.locationsService.getItemLocations()
            .subscribe(items => {
                for (let item of items) {
                    let itemArea = item.area;
                    // Group all items under the same area
                    if (this.itemLocations[itemArea] === undefined)
                        this.itemLocations[itemArea] = [];
                    delete item.area;
                    this.itemLocations[itemArea].push(item);
                }
                this.areaKeys = Object.keys(this.itemLocations);
            });
    }
}
