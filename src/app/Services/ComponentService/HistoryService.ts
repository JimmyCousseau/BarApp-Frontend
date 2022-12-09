import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "./GlobalSettings";

@Injectable({
    providedIn: 'root',
})
export class HistoryService {

    constructor(private http: HttpClient) { }

    getHistoryContent(waiter: string): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'history/' + waiter);
    }
}
