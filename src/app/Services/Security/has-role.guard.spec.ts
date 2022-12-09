import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../Interfaces/User';
import { AuthService } from './auth.service';
import { HasRoleGuard } from './has-role.guard';

class MockAuthService {
  isLoggedIn = true;
  private user: User = { Username: "Jimmy", Role: "Administrateur", Password: "" }
  login(username: string | null | undefined, password: string | null | undefined) {
    return true;
  }
  getUserUsername() {
    return this.user.Username;
  }
  getUserRole() {
    return this.user.Role;
  }
}

describe('HasRoleGuard', () => {
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HasRoleGuard,
        { provide: AuthService, useClass: MockAuthService, }
      ],
      imports: [MatSnackBarModule],
      declarations: [HasRoleGuard],
    }).compileComponents();
    authService = TestBed.inject(AuthService);

  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
