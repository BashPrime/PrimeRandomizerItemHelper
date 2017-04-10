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
    public locationShowModel: string;
    constructor(private locationsService: ItemLocationsService) {
        this.itemLocations = {};
        this.buildItemLocations();
        this.locationShowModel = "all";
    }

    buildItemLocations(): void {
        this.locationsService.getItemLocations()
            .subscribe(items => {
                for (let item of items) {
                    let itemArea = item.area;
                    // Group all items under the same area
                    if (this.itemLocations[itemArea] === undefined)
                        this.itemLocations[itemArea] = [];
                    this.itemLocations[itemArea].push(this.processItemLocation(item));
                }
                this.areaKeys = Object.keys(this.itemLocations);
            });
    }

    processItemLocation(itemLocation: Object): Object {
        itemLocation["found"]= false;
        itemLocation["obtained"] = false;
        delete itemLocation["area"];
        return itemLocation;
    }
}
