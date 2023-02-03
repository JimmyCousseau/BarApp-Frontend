import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Map } from '../Interfaces/Map';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapOrdersService {

  private readonly baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) {
  }

  find(): Observable<Map> {
    return this.http.get<Map>(this.baseUrl + 'global-settings/map')
  }

  upsert(map: Map): Observable<boolean> {
    return this.http.patch<boolean>(this.baseUrl + 'global-settings/map', { value: JSON.stringify(map) })
  }
}
