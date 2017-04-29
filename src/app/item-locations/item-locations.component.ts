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
    public itemLocations: Observable<Array<any>>;
    public areaKeys: Array<string>;
    public showArea: Object;
    public locationShowModel: string;
    constructor(public _locationsService: ItemLocationsService) {
        this.showArea = {};
        this.locationShowModel = "all";
    }

    public ngOnInit(): void {
        this.itemLocations = this._locationsService.getItemLocationsObservable();
        
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
