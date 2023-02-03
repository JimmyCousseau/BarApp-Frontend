import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../core/Interfaces/User';
import { AuthService } from '../../../core/authentification/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.authService.verifyToken()
  }

  submitForm(): void {
    if (this.form.invalid)
      return

    const username = this.form?.value.username
    const password = this.form?.value.password
    const user: User = {
      username: username ? username : "",
      password: password ? password : "",
      role: "",
    }

    this.authService
      .login(user)
      .subscribe((response: any) => {
        this.router.navigate(['../parameters']);
      });
  }
}
