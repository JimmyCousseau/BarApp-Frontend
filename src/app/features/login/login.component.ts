import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/authentification/auth.service';
import { User } from '../../core/Interfaces/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  isLoaded = false

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.authService.verifyToken().subscribe((data) => {
      if (data) {
        this.router.navigate(['/parameters'])
      } else if (
        this.router.url !== '/login'
        && this.router.url !== '/'
      ) {
        this.router.navigate(['login'])
      }
      this.isLoaded = true
    })
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

    this.authService.login(user).subscribe((response) => {
      if (response)
        this.router.navigate(['../parameters'])
    })
  }
}
