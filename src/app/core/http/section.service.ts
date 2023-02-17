import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Sections } from '../Interfaces/Sections';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private baseUrl = environment.baseUrl + "sections"

  constructor(
    private http: HttpClient,
  ) {

  }

  findAll(): Observable<Sections[]> {
    return this.http.get<Sections[]>(this.baseUrl);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<boolean>(this.baseUrl + '/' + id)
  }

  update(section: Sections): Observable<boolean> {
    return this.http.patch<boolean>(this.baseUrl, { section: section })
  }

  insert(section: Sections): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, { section: section })
  }
}
