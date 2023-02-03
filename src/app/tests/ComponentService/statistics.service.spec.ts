import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatisticsService } from '../../app/Services/ComponentService/statistics.service';
import { environment } from '../../environments/environment';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let httpTestingController: HttpTestingController;
  const baseUrl = environment.baseUrl

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatisticsService]
    });
    service = TestBed.inject(StatisticsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return an observable of data chart 1', () => {
    const mockData = { data: 'chart1 data' };
    service.findDataChart1().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${baseUrl}statistics/quantite-revenu-in-day`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
    httpTestingController.verify();
  });
});
