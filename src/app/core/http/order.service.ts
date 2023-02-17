import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../authentification/auth.service";
import { Order } from "../Interfaces/Order";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private readonly baseUrl = environment.baseUrl + "order"

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {

    }

    findAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl);
    }

    findAllPendingBy(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + "/pending/" + this.authService.getUser().username);
    }

    findAllBeingPrepared(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + '/being-prepared');
    }

    findAllWaitingPaiement(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + '/waiting-paiement');
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + "/" + id);
    }

    update(order: Order): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl, order)
    }

    updateStatePaid(tableID: number): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + '/paid-state', { table_id: tableID });
    }

    updateStatePrepared(order: Order): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + "/prepared-state", { order: order });
    }

    updateStateServed(order: Order): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + "/waiting-paiement-state", { order: order });
    }

    sendOrderToPrepare(need_preparation: boolean, order: Order): Observable<boolean> {
        order.waiter = this.authService.getUser().username
        return this.http.post<boolean>(this.baseUrl + '/' + need_preparation, order);
    }

}
