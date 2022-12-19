import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SendOrder } from "src/app/Interfaces/SendOrder";
import { GlobalSettings } from "./GlobalSettings";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private type: SendOrder[] = [];
    private order = new BehaviorSubject(this.type);
    sharedOrder = this.order.asObservable();

    constructor(private http: HttpClient) { }

    findAllSections(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'menu/sections');
    }

    findAllProducts(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'menu/products');
    }

    sendOrderToPrepare(username: string, idtable: number, order: SendOrder): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'menu/' + username + '/' + idtable, order);
    }

    resetSharedOrder(): void {
        this.type = [];
        this.order = new BehaviorSubject(this.type);
        this.sharedOrder = this.order.asObservable();
    }
}
