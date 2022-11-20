import { Component } from '@angular/core';
import { AuthService } from '../../Services/Security/auth.service';
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: User;

  constructor(private readonly authService: AuthService) {
    this.user = this.authService.getUser();
  }
}
