import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BasicProducts } from '../Interfaces/BasicProducts';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BasicProductService {

  private readonly baseUrl = environment.baseUrl + "basic-products"

  constructor(
    private http: HttpClient,
  ) { }

  findAll(): Observable<BasicProducts[]> {
    return this.http.get<BasicProducts[]>(this.baseUrl)
  }

  insert(product: BasicProducts): Observable<any> {
    return this.http.post<any>(this.baseUrl, { basicProduct: product })
  }

  update(product: BasicProducts): Observable<any> {
    return this.http.patch<any>(this.baseUrl, { basicProduct: product })
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "/" + id)
  }
}
