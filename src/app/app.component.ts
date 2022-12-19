import { Component, ViewChild } from '@angular/core';
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
  firstNumber: string = "0";
  secondNumber: string = "";
  operator: string = "";

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
    return AuthService.getUser().Role;
  }

  deleteNum(): void {
    if (this.secondNumber !== '') {
      this.secondNumber = this.secondNumber.slice(0, -1)
      if (this.secondNumber === '0')
        this.secondNumber = ''
    }
    else if (this.operator !== '')
      this.operator = ''
    else
      this.firstNumber = this.firstNumber.slice(0, -1)
    
  }

  addNum(num: string): void {
    if (this.operator === '') {
      if (this.firstNumber === "0")
        this.firstNumber = num
      else
        if (!(num === '.' && this.firstNumber.includes('.')))
          this.firstNumber += num
    }
    else
      if (!(num === '.' && this.firstNumber.includes('.')))
        this.secondNumber += num
    
  }

  setOperator(operator: string): void {
    if (this.operator === '')
      this.operator = operator
    else {
      this.calculate()
      this.operator = operator
    }
  }

  calculate(): void {
    if (this.secondNumber === '')
      return
    let f = parseFloat(this.firstNumber)
    let s = parseFloat(this.secondNumber)
    if (this.operator === '/')
      this.firstNumber = (f / s).toString()
    else if (this.operator === 'x')
      this.firstNumber = (f * s).toString()
    else if (this.operator === '+')
      this.firstNumber = (f + s).toString()
    else if (this.operator === '-')
      this.firstNumber = (f - s).toString()
    this.operator = ''
    this.secondNumber = ''
  }
}
