import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './Services/Security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BarApp';
  isLoggedIn = false;

  constructor(private _router: Router,
    private readonly authService: AuthService,
    private titleService: Title,
  ) {
    this.titleService.setTitle($localize`${this.title}`)
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
    });
  }

  getRoutes() {
    return this._router.url;
  }

  getRole(): string {
    return AuthService.getUserRole();
  }
}
