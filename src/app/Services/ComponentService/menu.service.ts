import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MenuOrder, Order } from "src/app/Interfaces/Order";
import { GlobalSettings } from "./globale-settings.service";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private order = new BehaviorSubject<MenuOrder[]>([]);
    private currentSection = new BehaviorSubject<string | null>(null);
    private tableID = new BehaviorSubject<number>(0);
    sharedOrder = this.order.asObservable()
    sharedSection = this.currentSection.asObservable()
    sharedTableID = this.tableID.asObservable()

    constructor(private http: HttpClient) { }

    findAllSections(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'menu/sections');
    }

    findAllProducts(): Observable<any> {
        return this.http.get(GlobalSettings.getURL() + 'menu/products');
    }

    sendOrderToPrepare(username: string, table_id: number, order: MenuOrder): Observable<any> {
        return this.http.post(GlobalSettings.getURL() + 'menu/' + username + '/' + table_id, order);
    }

    resetShared(): void {
        this.order = new BehaviorSubject<MenuOrder[]>([]);
        this.currentSection = new BehaviorSubject<string | null>(null);
        this.tableID = new BehaviorSubject<number>(0);
    }

    changeSection(section: string): void {
        this.currentSection.next(section);
    }

    changeTableID(id: number): void {
        this.tableID.next(id);
    }
}
