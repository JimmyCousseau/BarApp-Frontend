import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Products } from '../Interfaces/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl + "products"

  constructor(
    private http: HttpClient,
  ) {

  }

  findAll(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseUrl);
  }

  delete(product: string): Observable<any> {
    return this.http.delete<boolean>(this.baseUrl + '/' + product)
  }

  update(product: Products): Observable<boolean> {
    return this.http.patch<boolean>(this.baseUrl, { product: product })
  }

  insert(product: Products): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, { product: product })
  }

}
