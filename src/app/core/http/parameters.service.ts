import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) {

  }

  getCurrentIp(): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'order')
  }

}
