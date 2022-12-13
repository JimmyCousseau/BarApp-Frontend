import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Security/auth.service';

@Component({
  selector: 'app-unknown-page',
  templateUrl: './unknown-page.component.html',
  styleUrls: ['./unknown-page.component.scss']
})
export class UnknownPageComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.authService.verifyToken().then(() => {
      this.authService.isLoggedIn.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['menu'])
        } else {
          this.router.navigate(['login'])
        }
      })
    })
  }

}
