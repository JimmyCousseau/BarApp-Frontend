import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../../Interfaces/Role';
import { UserProxy } from '../../Interfaces/User';
import { LoginService } from '../ComponentService/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN = 'log_token'
  private readonly TOKEN_USERNAME = 'log_token_username'

  private static user: UserProxy = { username: "", role: "" };
  private static role: Role;

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  get token() {
    return localStorage.getItem(this.TOKEN)
  }

  verifyToken() {
    const token = this.token
    const username = localStorage.getItem(this.TOKEN_USERNAME);
    this.loginService.verifyToken(token, username)
      .subscribe((response) => {
        if (response !== null) {
          AuthService.user = response.user
          AuthService.role = response.role
          this._isLoggedIn.next(true)
          this.router.navigate(['../parameters'])
        } else {
          this._isLoggedIn.next(false)
          if (this.router.url !== '/login')
            this.router.navigate(['login'])
        }
      })
  }

  login(username: string | null | undefined, password: string | null | undefined) {
    return this.loginService.login(username, password)
      .pipe(
        tap((response: any) => {
          if (response != null) {
            localStorage.setItem(this.TOKEN, response.token)
            localStorage.setItem(this.TOKEN_USERNAME, response.user.username)

            AuthService.user = response.user
            AuthService.role = response.role

            this._isLoggedIn.next(true)
          } else {
            this._isLoggedIn.next(false)
            this._snackBar.open("Mauvais identifiant / mot de passe,\nVeuillez réessayer", "Ok", {
              duration: 3000,
              panelClass: ['snackbar'],
            })
          }
        })
      )
  }

  isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable()
  }

  static getUser(): Readonly<UserProxy> {
    return AuthService.user;
  }

  static getRole(): Readonly<Role> {
    return AuthService.role
  }

}
