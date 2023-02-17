import { BasicProductService } from '../basic-product.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BasicProducts } from '../../Interfaces/BasicProducts';
import { environment } from 'src/environments/environment';
import { Products } from '../../Interfaces/Products';

describe('BasicProductService', () => {
  let service: BasicProductService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = environment.baseUrl + "basic-products"

  const product: Products = {
    id: 0,
    name: '',
    price_sold: 0,
    price_bought: 0,
    section: "",
    amount: 0,
    need_preparation: false,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BasicProductService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient findAll', () => {
    service.findAll().subscribe(data => {
      expect(data).toBeDefined()
    })
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });

  it('can test HttpClient insert', () => {
    service.insert(product).subscribe(data => {
      expect(data).toBeDefined()
    })
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
    httpClient.delete<BasicProducts>(url + '/id')
      .subscribe();
    const req = httpTestingController.expectOne(url + '/id');
    expect(req.request.method).toEqual('DELETE');
    httpTestingController.verify();
  });
});
