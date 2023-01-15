import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Security/auth.service';

@Component({
  selector: 'app-unknown-page',
  templateUrl: './unknown-page.component.html',
  styleUrls: ['./unknown-page.component.scss']
})
export class UnknownPageComponent implements OnInit {


  constructor(
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.authService.verifyToken()
  }
}
