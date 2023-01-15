import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HistoryComponent } from '../../Components/history/history.component';
import { UserProxy } from '../../Interfaces/User';
import { HistoryService } from '../../Services/ComponentService/history.service';
import { AuthService } from '../../Services/Security/auth.service';

class MockAuthService {
  isLoggedIn = true;
  private user: UserProxy = { username: "Jimmy", role: "Administrateur", Password: "" }
  login(username: string | null | undefined, password: string | null | undefined) {
    return true;
  }
  getUserUsername() {
    return this.user.username;
  }
  getUserRole() {
    return this.user.role;
  }
}

class MockHistoryService {
  getHistoryContent(waiter: string) {
    return null;
  }
}

describe('HistoryComponent', () => {
  let component: any;
  let authService: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [
        HistoryComponent,
        { provide: AuthService, useClass: MockAuthService },
        { provide: HistoryService, useClass: MockHistoryService },
      ]
    });

    component = TestBed.inject(HistoryComponent);
    authService = TestBed.inject(AuthService);
  });

  it('should be created component', () => {
    const fixture = TestBed.createComponent(HistoryComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
