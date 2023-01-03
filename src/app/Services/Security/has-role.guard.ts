import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private _snackBar: MatSnackBar) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const perm = JSON.parse(JSON.stringify(AuthService.getPermissions()));
    const hasPermission = perm[route.data['permission']]
    
    if (!hasPermission)
      this._snackBar.open("You don't have the permissions", "Ok", { duration: 3000 });
    return hasPermission;
  }
}
