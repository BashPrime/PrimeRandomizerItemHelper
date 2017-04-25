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
    public itemLocations: Array<any>;
    public areaKeys: Array<string>;
    public showArea: Object;
    public locationShowModel: string;
    constructor(private locationsService: ItemLocationsService) {
        this.locationShowModel = "all";
        this.buildItemLocations();
    }

    buildItemLocations(): void {
        this.itemLocations = [];
        this.showArea = {};
        this.locationsService.retrieveItemLocations()
            .subscribe(items => {
                for (let item of items) {
                    // Build showArea model from item locations
                    if (this.showArea[item.area] === undefined)
                        this.showArea[item.area] = true;
                    this.itemLocations.push(this.processItemLocation(item));
                }
                this.areaKeys = Object.keys(this.showArea);
            });
    }

    processItemLocation(itemLocation): Object {
        itemLocation.found = false;
        itemLocation.obtained = false;
        itemLocation.actualItem = "";
        return itemLocation;
    }

    shouldShowLocation(itemLocation): boolean {
        if (this.showArea[itemLocation.area] === true) {
            if (this.locationShowModel === "all")
                return true;
            else if (this.locationShowModel === "found" && itemLocation.found === true)
                return true;
            else if (this.locationShowModel === "remaining" && (itemLocation.obtained === undefined || itemLocation.obtained === false))
                return true;
        }
        
        return false;
    }
}
