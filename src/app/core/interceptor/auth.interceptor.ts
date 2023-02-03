import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentification/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const role = this.authService.getRole()
    const user = this.authService.getUser()
    const headers = request.headers.set("authorization", this.authService.getToken())
      .set('username', user ? user.username : "")
      .set('role', role ? JSON.stringify(role) : "")

    request = request.clone({
      headers: headers
    })
    return next.handle(request);
  }
}
