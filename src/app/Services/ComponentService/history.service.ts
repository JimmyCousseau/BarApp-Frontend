import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "./globale-settings.service";

@Injectable({
    providedIn: 'root',
})
export class HistoryService {

    constructor(private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'history');
    }
}
