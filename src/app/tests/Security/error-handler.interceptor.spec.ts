import { TestBed } from '@angular/core/testing';

import { ErrorHandlerInterceptor } from '../../app/Services/Security/http-interceptors/error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorHandlerInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: ErrorHandlerInterceptor = TestBed.inject(ErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
