import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "src/app/Interfaces/Order";
import { GlobalSettings } from "./globale-settings.service";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    findAllBy(waiter: string): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + "order/" + waiter);
    }

    delete(waiter: string, table_id: number, name: string): Observable<any> {
        return this.http.delete(GlobalSettings.getURL() + "order/" + waiter + "/" + table_id + "/" + name);
    }

    update(order: Order): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "order", order)
    }

    updateStateByOrder(order: Order): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "order/etat", { order: order })
    }

    updateStateByTable(table_id: number, waiter: string): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "order/etat/" + table_id, { waiter: waiter });
    }

}
