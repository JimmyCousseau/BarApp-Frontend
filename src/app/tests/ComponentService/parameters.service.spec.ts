import { TestBed } from '@angular/core/testing';

import { ParametersService } from '../../core/http/parameters.service';

describe('ParametersService', () => {
  let service: ParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
