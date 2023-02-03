import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../../core/Interfaces/Order';
import { KitchenService } from '../../../core/http/kitchen.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  isFullScreen = false;
  displayedColumns = ['amount', 'name', 'note']
  interval: any

  private orders: Order[] = []

  constructor(
    private kitchenService: KitchenService,
  ) {
    this.interval = setInterval(() => {
      this.ngOnInit()
    }, 60000)
  }

  ngOnInit(): void {
    this.kitchenService.findAll().subscribe((orders: Order[]) => {
      let data: Order[] = []
      orders.forEach((order) => {
        let found = data.find((o: Order) => o.table_id === order.table_id && o.name === order.name && o.note === order.note)
        found ? found.amount += order.amount : data.push(order)
      })
      this.orders = data
    })
  }

  getOrdersGrouped() {
    let orderMap: Map<number, Order> = new Map<number, Order>()
    this.orders.sort((a: Order, b: Order) => Date.parse(a.date.toString()) - Date.parse(b.date.toString()))
    this.orders.forEach((order: Order) => {
      if (!orderMap.has(order.table_id))
        orderMap.set(order.table_id, order)
    })
    return orderMap
  }

  getDataSourceBy(table_id: number): MatTableDataSource<Order> {
    return new MatTableDataSource<Order>(this.orders.filter((order) => order.table_id === table_id))
  }

  sendBackToWaiter(order: Order): void {
    this.kitchenService.update(order).subscribe((response) => {
      this.ngOnInit()
    })
  }

  toggleFullScreen() {
    this.isFullScreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
    const x = document.getElementById('app-component')
    if (x)
      x.style.display = this.isFullScreen ? 'block' : 'none'
    this.isFullScreen = !this.isFullScreen
  }
}
