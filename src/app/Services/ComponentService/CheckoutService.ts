import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalSettings } from "./GlobalSettings";


@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private http: HttpClient) { }

    findAll(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'checkout');
    }

    confirmPaiement(server: string, idtable: number): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'checkout/paid', { idtable, server });
    }

}
