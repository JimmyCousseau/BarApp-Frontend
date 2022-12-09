import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "src/app/Interfaces/Order";
import { GlobalSettings } from "./GlobalSettings";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    getOrdersPending(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'order/pending/admin');
    }

    deleteProductInOrder(server: string, idtable: number, intitule: string): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + "order/delete/" + server + "/" + idtable + "/" + intitule, null);
    }

    updateOrderDealt(order: Order): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + "order/update/dealt", order);
    }

}
