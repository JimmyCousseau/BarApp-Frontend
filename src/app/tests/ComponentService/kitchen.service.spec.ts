import { TestBed } from '@angular/core/testing';

import { KitchenService } from '../../app/Services/ComponentService/kitchen.service';

describe('KitchenService', () => {
  let service: KitchenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitchenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
