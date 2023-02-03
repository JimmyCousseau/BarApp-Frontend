import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Map } from '../../app/core/Interfaces/Map';
import { MapOrdersService } from '../../app/Services/ComponentService/map-orders.service';
import { environment } from '../../environments/environment';

describe('MapOrdersService', () => {
  let service: MapOrdersService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MapOrdersService]
    });
    service = TestBed.inject(MapOrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to get the map', () => {
    const testMap: Map = { width: 0, blocks: [] };
    service.find().subscribe((map) => {
      expect(map).toEqual(testMap);
    });

    const req = httpMock.expectOne(baseUrl + 'global-settings/map');
    expect(req.request.method).toBe('GET');
    req.flush(testMap);
  });

  it('should make a PATCH request to update the map', () => {
    const testMap = {
      width: 1,
      blocks: [],
    };
    service.upsert(testMap).subscribe();

    const req = httpMock.expectOne(baseUrl + 'global-settings/map');
    expect(req.request.method).toBe('PATCH');
    req.flush({});
  });
});
