import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemLocationsService {
    private itemLocations: Array<any>;

    constructor(private http: Http) {
    }

    public getItemLocations(): Observable<any> {
        return this.http.request("./assets/json/locations.json")
            .map(res => res.json());
    }
}