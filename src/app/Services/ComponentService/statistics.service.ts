import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalSettings } from './GlobalSettings';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
  ) {

  }

  findDataChart1(): Observable<any> {
    return this.http.get(GlobalSettings.getURL() + 'statistics/quantite-revenu-in-day')
  }

  findAllProductOrdered(): Observable<any> {
    return this.http.get(GlobalSettings.getURL() + 'statistics/all-product-ordered')
  }

  findRevenuThisWeek(): Observable<any> {
    return this.http.get(GlobalSettings.getURL() + 'statistics/revenu-this-week')
  }

  findRevenuThisMonth(): Observable<any> {
    return this.http.get(GlobalSettings.getURL() + 'statistics/revenu-this-month')
  }

  findRevenuThisYear(): Observable<any> {
    return this.http.get(GlobalSettings.getURL() + 'statistics/revenu-this-year')
  }

  findAllRevenu(): Observable<any> {
    return this.http.get(GlobalSettings.getURL() + 'statistics/all-revenu')
  }
}
