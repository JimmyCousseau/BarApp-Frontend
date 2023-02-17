import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Map } from '../Interfaces/Map';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {

  private baseUrl = environment.baseUrl + "global-settings"

  constructor(
    private http: HttpClient,
  ) {

  }

  findMap(): Observable<Map> {
    return this.http.get<Map>(this.baseUrl + '/map')
  }

  upsertMap(map: Map): Observable<boolean> {
    return this.http.patch<boolean>(this.baseUrl + '/map', { value: JSON.stringify(map) })
  }

  getIpAdress(): Observable<any> {
    return this.http.get("http://api.ipify.org")
  }
}
