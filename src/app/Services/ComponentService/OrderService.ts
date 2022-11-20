import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "src/app/Interfaces/Order";


@Injectable({
    providedIn: 'root'
})
export class OrderService {
    
    private url: string = 'http://localhost:3000/';
    constructor(private http: HttpClient) { }

    getOrdersPending(): Observable<any> {
        return this.http.get(this.url + 'order/pending/admin');
    }

    deleteProductInOrder(server: string, idtable: number, intitule: string): Observable<any> {
        return this.http.post(this.url + "order/delete/" + server + "/" + idtable + "/" + intitule, null);
    }

    updateOrderDealt(order: Order): Observable<any> {
        return this.http.post(this.url + "order/update/dealt", order);
    }

}
