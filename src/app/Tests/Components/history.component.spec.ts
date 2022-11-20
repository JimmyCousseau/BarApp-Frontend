import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../Services/Security/auth.service';
import { User } from '../../Interfaces/User';
import { HistoryComponent } from '../../Components/history/history.component';
import { HistoryService } from '../../Services/ComponentService/HistoryService';

class MockAuthService {
  _isLoggedIn$ = true;
  isLoggedIn$ = true;

  user: User = { Username: "", Role: "", Password: "" };
}

class MockHistoryService {
  getHistoryContent() {
    return "";
  }
}

describe('HistoryComponent', () => {
  let component: HistoryComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        HistoryComponent,
        { provide: AuthService, useClass: MockAuthService },
        { provide: HistoryService, useClass: MockHistoryService },
      ]
    });

    component = TestBed.inject(HistoryComponent);
  });

  it('should not welcome', () => {
    expect(component.historyContent).toBeNull();
  });
});
