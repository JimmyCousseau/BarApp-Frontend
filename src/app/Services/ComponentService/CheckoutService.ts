import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "./GlobalSettings";


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    
    constructor(private http: HttpClient) { }

    getCheckoutOrders(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'checkout');
    }

    confirmOrderPaiement(server: string, idtable: number): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'checkout/paid/' + idtable + '/' + server, null);
    }

}
