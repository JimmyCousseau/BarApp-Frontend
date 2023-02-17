import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labels } from '../Interfaces/Labels';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  private baseUrl = environment.baseUrl + "labels"

  constructor(
    private http: HttpClient,
  ) {

  }

  findAll(): Observable<Labels[]> {
    return this.http.get<Labels[]>(this.baseUrl)
  }

  create(labels: Labels): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, { label: labels })
  }

  update(label: Labels): Observable<boolean> {
    return this.http.patch<boolean>(this.baseUrl, { label: label })
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + '/' + id)
  }

}
