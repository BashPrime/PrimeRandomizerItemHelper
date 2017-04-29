import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ItemLocationsService {
    private itemLocations: Array<any>;
    private items: Object;
    private areas: Array<string>;

    private itemLocationsSubject: BehaviorSubject<Array<any>>;
    private itemsSubject: BehaviorSubject<Object>;
    private areasSubject: BehaviorSubject<Array<string>>;

    constructor(private http: Http) {
        this.itemLocationsSubject = new BehaviorSubject([]);
        this.itemsSubject = new BehaviorSubject({});
        this.areasSubject = new BehaviorSubject([]);
        this.buildDataArrays();
    }

    public buildDataArrays(): void {
        this.retrieveItemLocationsJson()
            .subscribe(itemLocations => {
                this.itemLocations = [];
                this.items = {};
                this.areas = [];
                for (let item of itemLocations) {
                    if (this.areas.length < 1 || this.areas[this.areas.length - 1] !== item.area) {
                        this.areas.push(item.area);
                        this.areasSubject.next(this.areas);
                    }
                    // Add item location
                    this.itemLocations.push(this.processItemLocation(item));
                    this.itemLocationsSubject.next(this.itemLocations);

                    // Add item (with counter info)
                    if (this.items[item.item] === undefined)
                        this.items[item.item] = {found: 0, obtained: 0, total: 1};
                    else
                        this.items[item.item]["total"] += 1;
                    this.itemsSubject.next(this.items);
                } 
            });
    }

    public retrieveItemLocationsJson(): Observable<any> {
        return this.http.request("./assets/json/locations.json")
            .map(res => res.json());
    }

    private processItemLocation(itemLocation): Object {
        itemLocation.found = false;
        itemLocation.obtained = false;
        itemLocation.actualItem = "";
        return itemLocation;
    }

    public getItemLocationsObservable(): Observable<Array<any>> {
        return this.itemLocationsSubject.asObservable();
    }

    public getItemsObservable(): Observable<Object> {
        return this.itemsSubject.asObservable();
    }

    public getAreasObservable(): Observable<Array<string>> {
        return this.areasSubject;
    }
}