import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../Interfaces/User';
import { LoginService } from '../ComponentService/LoginService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private user: User = { Username: "", Role: "", Password: "" };

  constructor(
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
  ) {
    this._isLoggedIn$.next(false);
  }

  login(username: string | null | undefined, password: string | null | undefined) {
    return this.loginService.login(username, password)
      .pipe(
        tap((response: any) => {
          if (response != null) {
            this._isLoggedIn$.next(true);
            this.user = { Username: response.Username, Role: response.Role, Password: '' };
          } else {
            this._isLoggedIn$.next(false);
            this._snackBar.open("Mauvais identifiant / mot de passe,\nVeuillez réessayer", "Ok", {
              duration: 3000,
              panelClass: ['snackbar'],
            })
          }
        })
      )
  }

  getUser() {
    return this.user;
  }


}
