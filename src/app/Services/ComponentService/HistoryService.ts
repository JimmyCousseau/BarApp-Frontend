import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HistoryService {

    private url: string = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    getHistoryContent(waiter: string): Observable<any> {
        return this.http.get(this.url + 'history/' + waiter);
    }
}
