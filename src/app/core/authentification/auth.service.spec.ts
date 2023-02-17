import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../http/login.service';
import { User, UserProxy } from '../Interfaces/User';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs'
import { Role } from '../Interfaces/Role';

describe('AuthService', () => {
  let service: AuthService;
  let routerMock = { navigate: jasmine.createSpy('navigate') }

  const defaultUser: UserProxy = {
    username: "",
    role: "",
  }

  const defaultRole: Role = {
    role: "",
    access_administration_panel: false,
    access_checkout: false,
    access_history: false,
    access_kitchen: false,
    access_menu: false,
    access_orders: false,
    access_statistics: false,
    modify_map: false,
    modify_menu: false,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [
        AuthService,
        { provide: Router, useValue: routerMock },
        LoginService,
      ]
    });
    service = TestBed.inject(AuthService);
    service.login({ username: 'test', password: 'test', role: 'test' })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should be disconnected', () => {
    service.disconnect()

    service.isLoggedIn().subscribe((loggedIn) => {
      expect(loggedIn).toBeFalsy();
    })

    expect(service.getUser()).toEqual(defaultUser)
    expect(service.getRole()).toEqual(defaultRole)
    expect(service.getToken()).toEqual("")

    service.verifyToken().subscribe((response) => {
      expect(response).toBe(null)
    })
  });
});
