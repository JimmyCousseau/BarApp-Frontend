import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../Interfaces/Order";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class HistoryService {

    private readonly baseUrl = environment.baseUrl

    constructor(private http: HttpClient) { }

    findAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + 'history');
    }
}
