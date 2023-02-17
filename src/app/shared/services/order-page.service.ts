import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderPageService {

  private stylePage = new BehaviorSubject<Readonly<"map" | "list">>("list");
  sharedStylePage = this.stylePage.asObservable();

  swapStylePage(): void {
    this.stylePage.next(this.stylePage.getValue() === "map" ? "list" : "map")
  }
}
