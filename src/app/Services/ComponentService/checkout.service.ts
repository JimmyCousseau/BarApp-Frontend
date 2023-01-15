import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "./globale-settings.service";


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'checkout');
    }

    confirmPaiement(waiter: string, tableID: number): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'checkout/paid', { table_id: tableID, waiter: waiter });
    }

}
