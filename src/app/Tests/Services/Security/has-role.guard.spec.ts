import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../../Services/Security/auth.service';
import { HasRoleGuard } from '../../../Services/Security/has-role.guard';

describe('HasRoleGuard', () => {
  let guard: HasRoleGuard;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    auth = TestBed.inject(AuthService);
    guard = TestBed.inject(HasRoleGuard);
  });

  it('should be created', () => {
    expect(auth).toBeTruthy();
  });
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
