import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../../core/authentification/auth.service";
import { Order } from "../../core/Interfaces/Order";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private order = new BehaviorSubject<Order[]>([]);
    private currentSection = new BehaviorSubject<string | null>(null);
    private tableID = new BehaviorSubject<number>(0);
    sharedOrder = this.order.asObservable()
    sharedSection = this.currentSection.asObservable()
    sharedTableID = this.tableID.asObservable()


    constructor(
        private authService: AuthService,
    ) {
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

    canSwapMod(): boolean { return this.authService.getRole().modify_menu }
}
