import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/http/order.service';
import { Order } from 'src/app/core/Interfaces/Order';
import { OrderPageService } from 'src/app/shared/services/order-page.service';
import { OrdersComponent } from '../main/orders.component';


@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent extends OrdersComponent {

  ordersPending: Order[] = []
  tables: number[] = []

  constructor(
    protected override orderPageService: OrderPageService,
    protected override orderService: OrderService,
    protected override dialog: MatDialog,
  ) {
    super(orderService, orderPageService, dialog)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    this.dialog.closeAll()
    this.orderService.findAllPendingBy().subscribe((data: Order[]) => {
      this.ordersPending = []
      this.tables = []

      data.forEach((value) => {
        let found = this.ordersPending.find((o) => o.table_id === value.table_id && o.name === value.name && o.note === value.note)
        if (found)
          found.amount += value.amount
        else
          this.ordersPending.push(value)

        if (!this.tables.some((t) => t === value.table_id))
          this.tables.push(value.table_id)
      })
    })
  }

  getDataSource(table: number): Order[] {
    return this.ordersPending.filter((order: Order) => order.table_id === table)
  }

}
