import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from "chart.js";
import { dayToMilliseconds, monthToMilliseconds } from '../../core/utils/common-functions';
import { OrderService } from '../../core/http/order.service';
import { ProductService } from '../../core/http/product.service';
import { Order } from '../../core/Interfaces/Order';
import { Products } from '../../core/Interfaces/Products';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  private readonly red_bordeaux = "#6d071a"
  private readonly royal_blue = "#4169E1"
  private readonly blue_night = "#03224c"
  private readonly gold = "#D79A10"
  private readonly dayOfWeek: string[] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  private readonly monthOfYear: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

  dataChart1!: ChartConfiguration['data']
  dataRevenuThisWeek!: ChartConfiguration['data']
  dataRevenuThisMonth!: ChartConfiguration['data']
  dataRevenuThisYear!: ChartConfiguration['data']
  dataAllRevenu!: ChartConfiguration['data']
  dataAllProductOrdered!: ChartConfiguration['data']
  dataClassementProduct!: ChartConfiguration['data']

  STDProductPrice: any

  private orders: Order[] = []
  private products: Products[] = []

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {

  }

  ngOnInit(): void {
    this.orderService.findAll().subscribe((orders: Order[]) => {
      this.orders = orders
      this.productService.findAll().subscribe((products: Products[]) => {
        this.products = products
        this.dataClassementProduct = this.getClassementProducts()
        this.dataChart1 = this.getRevenu(
          24,
          (i: number) => (24 - i).toString(),
          (date: Date, column: number) => new Date(date) > new Date(Date.now() - dayToMilliseconds(365)),
          (date: Date) => new Date(date).getHours().toString()
        )
        this.dataRevenuThisWeek = this.getRevenu(
          7,
          (i: number) => this.dayOfWeek[new Date(Date.now() - dayToMilliseconds(i)).getDay()],
          (date: Date, column: number) => new Date(date) > new Date(Date.now() - dayToMilliseconds(column)),
          (date: Date) => this.dayOfWeek[new Date(date).getDay()]
        )
        this.dataRevenuThisMonth = this.getRevenu(
          25,
          (i: number) => new Date(Date.now() - dayToMilliseconds(i)).getDate().toString(),
          (date: Date, column: number) => new Date(date) > new Date(Date.now() - dayToMilliseconds(column)),
          (date: Date) => new Date(date).getDate().toString(),
        )
        this.dataRevenuThisYear = this.getRevenu(
          12,
          (i: number) => this.monthOfYear[new Date(Date.now() - monthToMilliseconds(i)).getMonth()],
          (date: Date, column: number) => new Date(date) > new Date(Date.now() - monthToMilliseconds(column)),
          (date: Date) => this.monthOfYear[new Date(date).getMonth()],
        )
        this.dataAllRevenu = this.getRevenu(
          10,
          (i: number) => (new Date(Date.now()).getFullYear() - i).toString(),
          (date: Date, column: number) => true,
          (date: Date) => (new Date(date).getFullYear()).toString(),
        )
        this.STDProductPrice = this.getSTDProductPrice()
      })
    })
  }

  private getSTDProductPrice() {
    let totalPrice = 0
    let totalAmount = 0
    this.orders.filter((order) => new Date(order.date) > new Date(Date.now() - dayToMilliseconds(365)))
      .forEach((order) => {
        totalPrice += order.unit_price
        totalAmount += order.amount
      })
    return totalPrice / totalAmount
  }

  // TODO: Warning: the pie can contain a lot of products
  private getClassementProducts(): ChartConfiguration['data'] {
    let data: { name: string, amount: number }[] = []

    this.orders.filter((order) => new Date(order.date) > new Date(Date.now() - dayToMilliseconds(365)))
      .forEach((order: Order) => {
        let found = data.find((item) => item.name === order.name)
        if (found)
          found.amount += order.amount
        else
          data.push({ name: order.name, amount: order.amount })
      })
    data.sort((a, b) => b.amount - a.amount)

    return {
      labels: data.map((data) => data.name),
      datasets: [
        this.getDataSet(data.map((data) => data.amount), "Quantité acheté", [this.red_bordeaux, this.blue_night, this.royal_blue, this.gold], 1),
      ]
    }
  }

  private getRevenu(column: number, label: Function, filter: Function, find: Function): ChartConfiguration['data'] {
    let data: { day: string, recette: number, amount: number }[] = []
    for (let i = column - 1; i >= 0; i--) {
      data.push({ day: label(i), recette: 0, amount: 0 })
    }
    this.orders.filter((order) => filter(order.date, column))
      .forEach((order) => {
        let found = data.find((item) => item.day === find(order.date))
        if (found) {
          found.recette += order.amount * order.unit_price
          found.amount += order.amount
        }
      })
    return {
      labels: data.map((v) => v.day),
      datasets: [
        this.getDataSet(data.map((v) => v.amount), "Quantité vendu", [this.red_bordeaux], 1),
        this.getDataSet(data.map((v) => v.recette), "Recette total (en €)", [this.royal_blue], 1),
      ]
    }
  }

  getOptions(title: string, animationTime: number = 1000): ChartConfiguration['options'] {
    return {
      responsive: true,
      animation: {
        duration: animationTime,
      },
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 24
          },
          padding: {
            top: 40,
            bottom: 10
          }
        }
      }
    }
  }

  private getDataSet(data: number[], label: string, color: string[], opacity: number) {
    return {
      data: data,
      label: label,
      fill: true,
      tension: 0.5,
      backgroundColor: color,
      backgroundOpacity: opacity,
    }
  }

  isLoaded(): boolean { return this.products ? true : false }
}
