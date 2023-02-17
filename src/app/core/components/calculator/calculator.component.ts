import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  firstNumber: string = "0"
  secondNumber: string = ""
  openHistory: boolean = false
  calcHistory: { result: string, f: string, o: keyof typeof CalculatorComponent.math, s: string }[] = []
  private static math = {
    ' ': function (x: number, y: number) { return x },
    'x': function (x: number, y: number) { return (x * y).toPrecision(4) },
    '/': function (x: number, y: number) { return (x / y).toPrecision(4) },
    '+': function (x: number, y: number) { return (x + y).toPrecision(4) },
    '-': function (x: number, y: number) { return (x - y).toPrecision(4) },
    '%': function (x: number, y: number) { return (x % y).toPrecision(4) },
  }
  operator: keyof typeof CalculatorComponent.math = ' '


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

  setOperator(operator: keyof typeof CalculatorComponent.math): void {
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
    const result = CalculatorComponent.math[this.operator](parseFloat(this.firstNumber), parseFloat(this.secondNumber)).toString()
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

  getBackHistoryOperation(f: string, o: keyof typeof CalculatorComponent.math, s: string) {
    this.firstNumber = f
    this.operator = o
    this.secondNumber = s
  }


}
