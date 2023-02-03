import { TestBed } from '@angular/core/testing';

import { LabelsService } from '../../app/Services/ComponentService/labels.service';

describe('LabelsService', () => {
  let service: LabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
