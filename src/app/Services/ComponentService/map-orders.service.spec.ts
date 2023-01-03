import { TestBed } from '@angular/core/testing';

import { MapOrdersService } from './map-orders.service';

describe('MapOrdersService', () => {
  let service: MapOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
