import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    
    private url: string = 'http://localhost:3000/';
    constructor(private http: HttpClient) { }

    getCheckoutOrders(): Observable<any> {
        return this.http.get(this.url + 'checkout');
    }

    confirmOrderPaiement(server: string, idtable: number): Observable<any> {
        return this.http.post(this.url + 'checkout/paid/' + idtable, null);
    }

}
