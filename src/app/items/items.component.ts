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
        this.buildItemsList();
    }



    ngOnInit() {
    }

    buildItemsList(): void {
        this.itemsList = {};
        this._locationsService.retrieveItemLocationsJson()
            .subscribe(items => {
                for (let item of items) {
                    if (this.itemsList[item.item] === undefined)
                        this.itemsList[item.item] = {found: 0, obtained: 0, total: 1};
                    else
                        this.itemsList[item.item]["total"] += 1;
                }
                this.itemKeys = Object.keys(this.itemsList);
            });
  }

}
