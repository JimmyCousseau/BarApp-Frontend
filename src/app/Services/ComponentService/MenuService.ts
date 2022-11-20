import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SendOrder } from "src/app/Interfaces/SendOrder";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private url: string = 'http://localhost:3000/';
    private type: SendOrder[] = [];
    private order = new BehaviorSubject(this.type);
    sharedOrder = this.order.asObservable();

    constructor(private http: HttpClient) { }

    getMenuSections(): Observable<any> {
        return this.http.get(this.url + 'menu/sections');
    }

    getMenuProducts(): Observable<any> {
        return this.http.get(this.url + 'menu/products');
    }

    sendOrderToPrepare(username: string, idtable: number, order: SendOrder): Observable<any> {
        return this.http.post(this.url + 'menu/send_order/' + username + '/' + idtable, order);
    }

    resetSharedOrder(): void {
        this.type = [];
        this.order = new BehaviorSubject(this.type);
        this.sharedOrder = this.order.asObservable();
    }
}
