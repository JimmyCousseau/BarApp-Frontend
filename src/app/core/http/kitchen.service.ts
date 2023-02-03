import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Interfaces/Order';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  private readonly baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) {

  }

  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + "kitchen")
  }

  update(order: Order): Observable<boolean> {
    return this.http.patch<boolean>(this.baseUrl + "kitchen", { order: order })
  }

}
