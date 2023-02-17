import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from 'src/app/core/Interfaces/State';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private readonly baseUrl = environment.baseUrl + "state"

  constructor(
    private http: HttpClient,
  ) {

  }

  findAll(): Observable<State[]> {
    return this.http.get<State[]>(this.baseUrl)
  }

}
