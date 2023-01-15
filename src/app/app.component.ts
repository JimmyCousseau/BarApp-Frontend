import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Role } from './Interfaces/Role';
import { AuthService } from './Services/Security/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private lastStateOrderPage: "list" | "map" = "list";
  private role!: Role

  title = 'BarApp';

  firstNumber: string = "0";
  secondNumber: string = "";
  openHistory: boolean = false;
  calcHistory: { result: string, f: string, o: keyof typeof AppComponent.math, s: string }[] = []
  private static math = {
    ' ': function (x: number, y: number) { return x },
    'x': function (x: number, y: number) { return (x * y).toPrecision(4) },
    '/': function (x: number, y: number) { return (x / y).toPrecision(4) },
    '+': function (x: number, y: number) { return (x + y).toPrecision(4) },
    '-': function (x: number, y: number) { return (x - y).toPrecision(4) },
    '%': function (x: number, y: number) { return (x % y).toPrecision(4) },
  }
  operator: keyof typeof AppComponent.math = ' ';

  constructor(private _router: Router,
    public readonly authService: AuthService,
    private titleService: Title,
  ) {
    this.titleService.setTitle($localize`${this.title}`)
    this.authService.verifyToken()
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(data => {
      this.role = AuthService.getRole()
    });
  }

  deleteNum(): void {
    if (this.secondNumber !== '') {
      this.secondNumber = this.secondNumber.slice(0, -1)
      if (this.secondNumber === '0')
        this.secondNumber = ''
    }
    else if (this.operator !== ' ')
      this.operator = ' '
    else {
      this.firstNumber = this.firstNumber.slice(0, -1)
      if (this.firstNumber === '')
        this.firstNumber = '0'
    }
  }

  addNum(num: string): void {
    if (this.operator === ' ') {
      if (this.firstNumber === "0")
        this.firstNumber = num
      else
        if (!(num === '.' && this.firstNumber.includes('.')) && this.firstNumber.length < 8)
          this.firstNumber += num
    }
    else
      if (!(num === '.' && this.secondNumber.includes('.')) && this.secondNumber.length < 8)
        this.secondNumber += num

  }

  setOperator(operator: keyof typeof AppComponent.math): void {
    if (this.operator === ' ')
      this.operator = operator
    else {
      this.calculate()
      this.operator = operator
    }
  }


  calculate(): void {
    if (this.secondNumber === "")
      return
    const result = AppComponent.math[this.operator](parseFloat(this.firstNumber), parseFloat(this.secondNumber)).toString()
    this.appendToHistory(result)
    this.clear()
    this.firstNumber = result
  }

  clear(): void {
    this.firstNumber = '0'
    this.operator = ' '
    this.secondNumber = ''
  }

  appendToHistory(result: string) {
    this.calcHistory.push({ result: result, f: this.firstNumber, o: this.operator, s: this.secondNumber })
    if (this.calcHistory.length > 5)
      this.calcHistory.shift()
  }

  getBackHistoryResult(result: string) {
    this.clear()
    this.firstNumber = result
  }

  getBackHistoryOperation(f: string, o: keyof typeof AppComponent.math, s: string) {
    this.firstNumber = f
    this.operator = o
    this.secondNumber = s
  }

  getLastStateOrderPage(): Readonly<"map" | "list"> { return this.lastStateOrderPage }
  setLastStateOrderPage(state: "map" | "list") { this.lastStateOrderPage = state }
  getRole(): Readonly<Role> { return this.role }
}
