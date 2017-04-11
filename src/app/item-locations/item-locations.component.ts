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
    public showArea: Object;
    public areaKeys: Array<any>;
    public locationShowModel: string;
    constructor(private locationsService: ItemLocationsService) {
        this.locationShowModel = "all";
        this.buildItemLocations();
    }

    buildItemLocations(): void {
        this.itemLocations = {};
        this.showArea = {};
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
                this.buildShowAreaModel();
            });
    }

    processItemLocation(itemLocation): Object {
        itemLocation.found = false;
        itemLocation.obtained = false;
        itemLocation.actualItem = "";
        //delete itemLocation.area;
        return itemLocation;
    }

    buildShowAreaModel(): void {
        for (let area of this.areaKeys) {
            this.showArea[area] = true;
        }
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
