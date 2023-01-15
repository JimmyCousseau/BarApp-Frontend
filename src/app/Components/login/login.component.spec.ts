import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/Security/auth.service';
import { LoginComponent } from '../../Components/login/login.component';
import { UserProxy } from '../../Interfaces/User';

class MockAuthService {
  isLoggedIn = true;
  private user: UserProxy = { username: "Jimmy", role: "Administrateur", Password: "" }
  login(username: string | null | undefined, password: string | null | undefined): boolean {
    return true;
  }
  getUserUsername(): string {
    return this.user.username;
  }
  getUserRole(): string {
    return this.user.role;
  }
}

describe('LoginComponent', () => {
  let component: any;
  let authService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, FormsModule],
      declarations: [
        LoginComponent,
        { provide: AuthService, useClass: MockAuthService },
      ]
    })
      .compileComponents();

    component = TestBed.inject(LoginComponent);
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create authService', () => {
    expect(authService).toBeTruthy();
  });
});
