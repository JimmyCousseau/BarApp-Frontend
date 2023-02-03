import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) {

  }

  findDataChart1(): Observable<any> {
    return this.http.get(this.baseUrl + 'statistics/quantite-revenu-in-day')
  }

  findAllProductOrdered(): Observable<any> {
    return this.http.get(this.baseUrl + 'statistics/all-product-ordered')
  }

  findRevenuThisWeek(): Observable<any> {
    return this.http.get(this.baseUrl + 'statistics/revenu-this-week')
  }

  findRevenuThisMonth(): Observable<any> {
    return this.http.get(this.baseUrl + 'statistics/revenu-this-month')
  }

  findRevenuThisYear(): Observable<any> {
    return this.http.get(this.baseUrl + 'statistics/revenu-this-year')
  }

  findAllRevenu(): Observable<any> {
    return this.http.get(this.baseUrl + 'statistics/all-revenu')
  }
}
