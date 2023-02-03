import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Order } from "../Interfaces/Order";
import { Products } from "../Interfaces/Products";
import { Sections } from "../Interfaces/Sections";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private readonly baseUrl = environment.baseUrl

    private order = new BehaviorSubject<Order[]>([]);
    private currentSection = new BehaviorSubject<string | null>(null);
    private tableID = new BehaviorSubject<number>(0);
    sharedOrder = this.order.asObservable()
    sharedSection = this.currentSection.asObservable()
    sharedTableID = this.tableID.asObservable()

    constructor(private http: HttpClient) { }

    findAllSections(): Observable<Sections[]> {
        return this.http.get<Sections[]>(this.baseUrl + 'sections');
    }

    findAllProducts(): Observable<Products[]> {
        return this.http.get<Products[]>(this.baseUrl + 'products');
    }

    sendOrderToPrepare(need_preparation: boolean, order: Order): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'order/' + need_preparation, order);
    }

    deleteSection(id: number): Observable<any> {
        return this.http.delete<boolean>(this.baseUrl + 'sections/' + id)
    }

    deleteProduct(product: string): Observable<any> {
        return this.http.delete<boolean>(this.baseUrl + 'products/' + product)
    }

    updateSection(section: Sections): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + 'sections', { section: section })
    }

    updateProduct(product: Products): Observable<boolean> {
        return this.http.patch<boolean>(this.baseUrl + 'products', { product: product })
    }

    insertProduct(product: Products): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'products', { product: product })
    }

    insertSection(section: Sections): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + 'sections', { section: section })
    }

    resetShared(): void {
        this.order = new BehaviorSubject<Order[]>([]);
        this.currentSection = new BehaviorSubject<string | null>(null);
        this.tableID = new BehaviorSubject<number>(0);
    }

    changeSection(section: string | null): void {
        this.currentSection.next(section);
    }

    changeTableID(id: number): void {
        this.tableID.next(id);
    }
}
