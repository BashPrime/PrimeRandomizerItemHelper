import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ItemLocationsService } from './item-locations.service';

@Component({
    selector: 'item-locations',
    templateUrl: './item-locations.component.html',
    styleUrls: ['item-locations.css']
})
export class ItemLocationsComponent {
    public itemLocations: Array<any>;
    public itemLocations2: Observable<Array<any>>;
    public areaKeys: Array<string>;
    public showArea: Object;
    public locationShowModel: string;
    constructor(public _locationsService: ItemLocationsService) {
        this.showArea = {};
        this.locationShowModel = "all";
    }

    public ngOnInit(): void {
        this.itemLocations2 = this._locationsService.getItemLocationsObservable();
        
        // Get item areas from observable object, set up showArea model
        this._locationsService.getAreasObservable()
            .subscribe(items => {
                this.areaKeys = items;
                this.buildShowAreaModel();
            });
    }

    private buildShowAreaModel(): void {
        this.showArea = {};
        for (let area of this.areaKeys)
            this.showArea[area] = true;
    }

    buildItemLocations(): void {
        this.itemLocations = [];
        this.showArea = {};
        this._locationsService.retrieveItemLocationsJson()
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
