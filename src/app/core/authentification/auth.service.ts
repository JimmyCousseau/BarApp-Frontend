import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from '../../core/http/login.service';
import { Role } from '../Interfaces/Role';
import { User, UserProxy } from '../Interfaces/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN = 'log_token'
  private readonly TOKEN_USERNAME = 'log_token_username'

  private readonly defaultUser: UserProxy = {
    username: "",
    role: "",
  }

  private readonly defaultRole: Role = {
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

  private user: UserProxy = this.defaultUser
  private role: Role = this.defaultRole

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {
  }

  getToken(): string {
    const token = localStorage.getItem(this.TOKEN)
    return token ? token : ""
  }

  verifyToken(): Observable<any> {
    const token = this.getToken()
    const username = localStorage.getItem(this.TOKEN_USERNAME);
    return this.loginService.verifyToken(token, username)
      .pipe(
        tap((response) => {
          if (response !== null) {
            this.user = response.user
            this.role = response.role
            this._isLoggedIn.next(true)
          } else {
            this._isLoggedIn.next(false)
          }
          return true;
        })
      )
  }

  login(user: User): Observable<any> {
    return this.loginService.login(user)
      .pipe(
        tap((response: any) => {
          if (response !== null) {
            localStorage.setItem(this.TOKEN, response.token)
            localStorage.setItem(this.TOKEN_USERNAME, response.user.username)

            this.user = response.user
            this.role = response.role

            this._isLoggedIn.next(true)
          } else {
            this._isLoggedIn.next(false)
            this.snackBar.open("Mauvais identifiant / mot de passe,\nVeuillez réessayer", "Ok", {
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

  getUser(): Readonly<UserProxy> {
    return this.user;
  }

  getRole(): Readonly<Role> {
    return this.role
  }

  disconnect(): void {
    if (!this.user)
      return
    this.loginService.disconnect(this.user.username).subscribe((response: boolean) => {
      localStorage.removeItem(this.TOKEN)
      localStorage.removeItem(this.TOKEN_USERNAME)
      this.user = this.defaultUser
      this.role = this.defaultRole
      this._isLoggedIn.next(false)
    })
  }

  verifyIdentification(user: User): Observable<boolean> {
    return this.loginService.verifyIdentification(user)
  }

}
