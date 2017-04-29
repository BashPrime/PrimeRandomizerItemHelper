import { Component, OnInit } from '@angular/core';
import { ItemLocationsService } from '../item-locations/item-locations.service';

@Component({
    selector: 'item-list',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
    public itemsList: Object;
    public itemKeys: Array<string>;

    constructor(private _locationsService: ItemLocationsService) {
    }

    ngOnInit() {
        this._locationsService.getItemsObservable()
            .subscribe(res => {
                this.itemsList = res;
                this.itemKeys = Object.keys(this.itemsList);
            });
    }
}
