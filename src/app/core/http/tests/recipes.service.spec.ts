
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { BasicProducts } from '../../Interfaces/BasicProducts';
import { RecipeService } from '../recipe.service';
import { Recipes } from '../../Interfaces/Recipes';

describe('RecipesService', () => {
  let service: RecipeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = environment.baseUrl + "recipes"

  const defaultRecipe: Recipes = {
    product_id: 1,
    basic_product_id: 1,
    amountUsed: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RecipeService
      ]
    });
    service = TestBed.inject(RecipeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient findManyBy', () => {
    httpClient.get<BasicProducts>(url)
      .subscribe(data => {
        expect(data).toBeDefined()
      });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  it('can test HttpClient insert', () => {
    httpClient.post<BasicProducts>(url, {})
      .subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    httpTestingController.verify();
  });

  it('can test HttpClient update', () => {
    httpClient.patch<BasicProducts>(url, {})
      .subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PATCH');
    httpTestingController.verify();
  });

  it('can test HttpClient delete', () => {
    service.delete(1, 1).subscribe()
    const req = httpTestingController.expectOne(url + '/1/1');
    expect(req.request.method).toEqual('DELETE');
    httpTestingController.verify();
  });

  it('can test HttpClient upsert', () => {
    service.upsert(defaultRecipe).subscribe(data => {
      console.log("hey")
    })
    const req = httpTestingController.expectOne(url + '/upsert');
    expect(req.request.method).toEqual('POST');
    httpTestingController.verify();
  });
});
