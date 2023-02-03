import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../Interfaces/Role';
import { User, UserProxy } from '../Interfaces/User';
import { LoginService } from '../../core/http/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN = 'log_token'
  private readonly TOKEN_USERNAME = 'log_token_username'

  private user!: UserProxy
  private role!: Role

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  getToken(): string {
    const token = localStorage.getItem(this.TOKEN)
    return token ? token : ""
  }

  verifyToken(): void {
    const token = this.getToken()
    const username = localStorage.getItem(this.TOKEN_USERNAME);
    this.loginService.verifyToken(token, username)
      .subscribe((response) => {
        if (response !== null) {
          this.user = response.user
          this.role = response.role
          this._isLoggedIn.next(true)
          this.router.navigate(['../parameters'])
        } else {
          this._isLoggedIn.next(false)
          if (this.router.url !== '/login')
            this.router.navigate(['login'])
        }
      })
  }

  login(user: User) {
    return this.loginService.login(user)
      .pipe(
        tap((response: any) => {
          if (response != null) {
            localStorage.setItem(this.TOKEN, response.token)
            localStorage.setItem(this.TOKEN_USERNAME, response.user.username)

            this.user = response.user
            this.role = response.role

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

  getUser(): Readonly<UserProxy> {
    return this.user;
  }

  getRole(): Readonly<Role> {
    return this.role
  }

  disconnect(): void {
    this.loginService.disconnect(this.getUser().username).subscribe((response: boolean) => {
      this.router.navigate(['/login'])
      localStorage.removeItem(this.TOKEN)
      localStorage.removeItem(this.TOKEN_USERNAME)
      this._isLoggedIn.next(false)
    })
  }

  verifyIdentification(user: User): Observable<boolean> {
    return this.loginService.verifyIdentification(user)
  }

}
