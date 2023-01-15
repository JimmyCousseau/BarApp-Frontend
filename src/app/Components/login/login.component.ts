import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Security/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
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

    this.authService
      .login(this.form.get('username')?.value, this.form.get('password')?.value)
      .subscribe((response: any) => {
        this.router.navigate(['../parameters']);
      });
  }
}
