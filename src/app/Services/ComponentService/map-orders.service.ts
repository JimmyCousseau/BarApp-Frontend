import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Interfaces/User';
import { GlobalSettings } from './GlobalSettings';

@Injectable({
  providedIn: 'root'
})
export class MapOrdersService {

  constructor(
    private http: HttpClient
  ) {
  }

  getMap(): Observable<any> {
    return this.http.get(GlobalSettings.getURL() + 'global-settings/map')
  }

  upsertMap(map: string, adminUser: User): Observable<any> {
    return this.http.patch(GlobalSettings.getURL() + 'global-settings/map', { value: map, adminUser: adminUser })
  }
}
