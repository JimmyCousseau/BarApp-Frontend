import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from "chart.js";
import { dayToMilliseconds, monthToMilliseconds } from '../../../app/utils/time';
import { StatisticsService } from '../../../app/Services/ComponentService/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  private readonly red_bordeaux = "#6d071a"
  private readonly royal_blue = "#4169E1"
  private readonly blue_night = "#03224c"
  private readonly gold = "#D79A10"
  private readonly dayOfWeek: string[] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  private readonly monthOfYear: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

  dataChart1: ChartConfiguration['data'] = { datasets: [], labels: [] }
  dataRevenuThisWeek: ChartConfiguration['data'] = { datasets: [], labels: [] }
  dataRevenuThisMonth: ChartConfiguration['data'] = { datasets: [], labels: [] }
  dataRevenuThisYear: ChartConfiguration['data'] = { datasets: [], labels: [] }
  dataAllRevenu: ChartConfiguration['data'] = { datasets: [], labels: [] }
  dataAllProductOrdered: ChartConfiguration['data'] = { datasets: [], labels: [] }
  dataClassementProduct: ChartConfiguration['data'] = { datasets: [], labels: [] }

  dataPeakInVisitHour: any
  dataPeakInVisitDay: any
  dataPeakInVisitMonth: any
  STDProductPrice: any
  isLoaded = false

  constructor(
    private statisticsService: StatisticsService,
  ) {

  }

  ngOnInit(): void {
    this.statisticsService.findDataChart1().subscribe((data) => {
      this.dataChart1 = this.getDataChart1(data)
      this.dataPeakInVisitHour = this.getPeakInVisitsHour(data)
    })
    this.statisticsService.findRevenuThisWeek().subscribe((data) => {
      this.dataRevenuThisWeek = this.getRevenuThisWeek(data)
      this.dataPeakInVisitDay = this.getPeakInVisitsDay(data)
    })
    this.statisticsService.findRevenuThisMonth().subscribe((data) => {
      this.dataRevenuThisMonth = this.getRevenuThisMonth(data)
    })
    this.statisticsService.findRevenuThisYear().subscribe((data) => {
      this.dataRevenuThisYear = this.getRevenuThisYear(data)
      this.dataPeakInVisitMonth = this.getPeakInVisitMonth(data)
    })
    this.statisticsService.findAllRevenu().subscribe((data) => {
      this.dataAllRevenu = this.getRevenuAllYears(data)
    })
    this.statisticsService.findAllProductOrdered().subscribe((data) => {
      this.STDProductPrice = this.getSTDProductPrice(data)
      this.dataClassementProduct = this.getClassementProducts(data)
      this.isLoaded = true
    })
  }

  private getDataChart1(data: any): ChartConfiguration['data'] {
    let label = []
    let dataNbVentes: number[] = []
    let dataPrix: number[] = []
    for (let i of data) {
      label.push(i.date + "h")
      dataNbVentes.push(i.amount)
      dataPrix.push(i.price_sold)
    }

    return {
      labels: label,
      datasets: [
        this.getDataSet(dataNbVentes, "Quantité vendu", [this.royal_blue], 1),
        this.getDataSet(dataPrix, "Recette", [this.red_bordeaux], 1),
      ]
    }
  }

  private getPeakInVisitsHour(dataChart1: any): string {
    let data = dataChart1.sort((a: any, b: any) => b.date - a.date)
    if (data.length > 1)
      return "à " + data[0].date + "h et à " + data[1].date + "h"
    if (data.length > 0)
      return " à " + data[0].date
    return " Je n'ai pas encore été défini"
  }

  private getPeakInVisitsDay(dataRevenuThisWeek: any): string {
    let data = dataRevenuThisWeek.sort((a: any, b: any) => b.date - a.date)
    return data.length > 0 ? this.dayOfWeek[data[0].date] : "?"
  }

  private getPeakInVisitMonth(dataRevenuThisYear: any) {
    let data = dataRevenuThisYear.sort((a: any, b: any) => b.date - a.date)
    return data.length > 0 ? this.monthOfYear[data[0].date - 1] : "?"
  }

  private getSTDProductPrice(dataAllProductOrdered: any) {
    let price = 0
    let quantity = 0
    for (let i of dataAllProductOrdered) {
      price += i.Prix * parseFloat(i.amount)
      quantity += parseFloat(i.amount)
    }
    return price / quantity
  }

  private getClassementProducts(dataAllProductOrdered: any): ChartConfiguration['data'] {
    let data = []
    let label = []
    for (let i of dataAllProductOrdered.sort((a: any, b: any) => b.amount - a.amount)) {
      data.push(i.amount)
      label.push(i.name)
    }
    return {
      labels: label,
      datasets: [
        this.getDataSet(data, "Quantité acheté", [this.red_bordeaux, this.blue_night, this.royal_blue, this.gold], 1),
      ]
    }
  }

  private getRevenuThisWeek(dataRevenuThisWeek: any): ChartConfiguration['data'] {
    let label: string[] = []
    let data: number[] = []
    for (let i = this.dayOfWeek.length - 1; i >= 0; i--) {
      let numDay = new Date(Date.now() - dayToMilliseconds(i)).getDay()
      label.push(this.dayOfWeek[numDay])

      let found = dataRevenuThisWeek.find((x: any) => x.date === numDay + 1)
      data.push(found ? found.price_sold : 0)
    }
    return {
      labels: label,
      datasets: [
        this.getDataSet(data, "Recette total (en €)", [this.blue_night], 1),
      ]
    }
  }

  private getRevenuThisMonth(dataRevenuThisMonth: any): ChartConfiguration['data'] {
    let data: number[] = []
    let label: string[] = []
    for (let i = 30; i >= 0; i--) {
      let numDay = new Date(Date.now() - dayToMilliseconds(i)).getDate()
      label.push(numDay + "")
      let found = dataRevenuThisMonth.find((x: any) => x.date === numDay)
      data.push(found ? found.price_sold : 0)
    }
    return {
      labels: label,
      datasets: [
        this.getDataSet(data, "Recette total (en €)", [this.royal_blue], 1),
      ]
    }
  }

  private getRevenuThisYear(dataRevenuThisYear: any): ChartConfiguration['data'] {
    let label: string[] = [];
    let data: number[] = [];
    for (let i = this.monthOfYear.length - 1; i >= 0; i--) {
      let numMonth = new Date(Date.now() - monthToMilliseconds(i)).getMonth() + 1
      label.push(numMonth + "")
      let found = dataRevenuThisYear.find((x: any) => x.date === numMonth)
      data.push(found ? found.price_sold : 0)
    }

    return {
      labels: label,
      datasets: [
        this.getDataSet(data, "Recette total (en €)", [this.royal_blue], 1),
      ]
    }
  }

  private getRevenuAllYears(dataAllRevenu: any): ChartConfiguration['data'] {
    let data: number[] = []
    let label: string[] = []
    for (let i of dataAllRevenu) {
      label.push(i.date)
      data.push(i.price_sold)
    }
    return {
      labels: label,
      datasets: [
        this.getDataSet(data, "Recette total (en €)", [this.royal_blue], 1),
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
          text: title
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
}
