import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../../../app.component';
import { Order } from '../../../core/Interfaces/Order';
import { OrderService } from '../../../core/http/order.service';
import { AuthService } from '../../../core/authentification/auth.service';
import { Dialog } from '../../utils/Dialog';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends Dialog implements OnInit {

  ordersPending!: Order[]
  tables: number[] = [];
  displayedColumns = ['intitule', 'quantite', 'etat', 'note']

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    protected override dialog: MatDialog,
    private appComponent: AppComponent,
  ) {
    super(dialog)
  }

  override ngOnInit(): void {
    this.dialog.closeAll()
    this.orderService.findAllBy(this.authService.getUser().username).subscribe(data => {
      let orders: Order[] = []
      data.forEach((value) => {
        let found = orders.find((o) => o.table_id === value.table_id && o.name === value.name && o.note === value.note)
        found ? found.amount += value.amount : orders.push(value)
      })
      this.ordersPending = orders;
      this.tables = this.ordersPending.map(order => order.table_id).filter((v, i, s) => v !== undefined && s.indexOf(v) === i)
    })
  }

  getDataSource(table: number): Order[] {
    return this.ordersPending.filter((order: Order) => order.table_id === table)
  }

  setStateOrderPage() { this.appComponent.setLastStateOrderPage("map") }

}
