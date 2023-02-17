import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './core/authentification/auth.service'


@Component({
  selector: 'app-root',
  template: `
    <div id="app-component" *ngIf="mayDisplayHeader()">
      <div *ngIf="isLoggedIn() | async">
          <app-header></app-header>
          <app-calculator></app-calculator>
      </div>
    </div>

    <router-outlet></router-outlet>

    <footer>
        <app-footer></app-footer>
    </footer>
  `,
  styleUrls: []
})
export class AppComponent {

  title = 'BarApp'

  constructor(
    private authService: AuthService,
    private titleService: Title,
    private router: Router,
  ) {
    this.titleService.setTitle($localize`${this.title}`)
  }

  isLoggedIn(): Observable<boolean> { return this.authService.isLoggedIn() }

  mayDisplayHeader(): boolean {
    return !this.router.isActive('', { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' })
  }
}
