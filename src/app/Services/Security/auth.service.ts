import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../Interfaces/User';
import { LoginService } from '../ComponentService/LoginService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  private static user: User = { Username: "", Role: "", Password: "" };

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  async verifyToken(): Promise<any> {
    const token = localStorage.getItem('log_token');
    const username = localStorage.getItem('log_token_username');
    return this.loginService.verifyToken(token, username)
      .subscribe((userReturned) => {
        if (userReturned != null) {
          AuthService.user = userReturned
          this._isLoggedIn.next(true)
          this.router.navigate(['menu'])
        } else {
          this._isLoggedIn.next(false)
          this.router.navigate(['login'])
        }
      })
  }

  login(username: string | null | undefined, password: string | null | undefined) {
    return this.loginService.login(username, password)
      .pipe(
        tap((response: any) => {
          if (response != null) {
            localStorage.setItem('log_token', response.token)
            localStorage.setItem('log_token_username', response.user.Username)
            AuthService.user = response.user
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

  static getUserRole(): Readonly<string> {
    return AuthService.user.Role;
  }

  static getUserUsername(): Readonly<string> {
    return AuthService.user.Username;
  }

  static getUser(): Readonly<User> {
    AuthService.user.Password = "";
    return AuthService.user;
  }
}
