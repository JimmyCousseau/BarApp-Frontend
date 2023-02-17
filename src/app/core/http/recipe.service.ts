import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipes } from '../Interfaces/Recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private readonly baseUrl = environment.baseUrl + "recipes"

  constructor(
    private http: HttpClient,
  ) { }

  findManyBy(product_id: number): Observable<Recipes[]> {
    return this.http.get<Recipes[]>(this.baseUrl + '/' + product_id)
  }

  insert(recipe: Recipes): Observable<any> {
    return this.http.post<any>(this.baseUrl, { recipe: recipe })
  }

  update(recipe: Recipes): Observable<any> {
    return this.http.patch<any>(this.baseUrl, { recipe: recipe })
  }

  delete(product_id: number, basic_product_id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/' + product_id + '/' + basic_product_id)
  }

  upsert(recipe: Recipes): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/upsert', { recipe: recipe })
  }
}
