import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule, ROUTES } from '@angular/router';
import { AuthService } from '../../authentification/auth.service';
import { AuthGuard } from '../auth.guard';


describe('AuthGuard', () => {
    let authService: AuthService
    let guard: AuthGuard;
    let routeMock: any = { snapshot: {} };
    let routeStateMock: any = { snapshot: {}, url: '/cookies' };
    let routerMock = { navigate: jasmine.createSpy('navigate') }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: Router, useValue: routerMock },
            ],
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
            ]
        });
        authService = TestBed.inject(AuthService);
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should be created authService', () => {
        expect(authService).toBeTruthy();
    });

    // it('should redirect an unauthenticated user to the login route', () => {
    //     expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    //     expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    // });
});
