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

    findAllBy(server: string): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + "order/" + server);
    }

    delete(server: string, idtable: number, intitule: string): Observable<any> {
        return this.http.delete(GlobalSettings.getURL() + "order/" + server + "/" + idtable + "/" + intitule);
    }

    update(order: Order): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "order", order)
    }

    updateEtatByOrder(order: Order): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "order/etat", { order: order })
    }

    updateEtatByTable(idtable: number, serveur: string): Observable<any> {
        return this.http.patch(GlobalSettings.getURL() + "order/etat/" + idtable, { serveur: serveur });
    }

}
