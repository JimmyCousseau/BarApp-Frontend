import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../Interfaces/Order";
import { environment } from "../../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private readonly baseUrl = environment.baseUrl

    constructor(private http: HttpClient) { }

    findAllBy(waiter: string): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "order/" + waiter);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + "order/" + id);
    }

    update(order: Order): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + "order", order)
    }

    updateState(order: Order): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + "order/state", { order: order });
    }

}
