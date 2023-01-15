import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProxy } from 'src/app/Interfaces/User';
import { GlobalSettings } from './globale-settings.service';

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

  upsertMap(map: string, adminUser: UserProxy): Observable<any> {
    return this.http.patch(GlobalSettings.getURL() + 'global-settings/map', { value: map, adminUser: adminUser })
  }
}
