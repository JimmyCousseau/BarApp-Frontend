import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/http/order.service';
import { Order } from '../../../../core/Interfaces/Order';
import { HeaderDialog } from '../../dialog/header-dialog/header-dialog.component';

@Component({
  selector: 'app-order-table-template',
  templateUrl: './order-table-template.component.html',
  styles: [],
})
export class OrderTableTemplate extends HeaderDialog {

  @Input()
  override dataSource!: { foo: any, data: Order[] }

  displayedColumns = ['name', 'amount', 'state', 'note']

  constructor(
    protected override dialog: MatDialog,
    private orderService: OrderService,
    private router: Router,
  ) {
    super(dialog);
  }

  orderDealtByTable(): void {
    if (this.dataSource.data === undefined || this.dataSource.data === null || this.dataSource.data.length === 0)
      return
    this.orderService.updateStatePrepared(this.dataSource.data[0]).subscribe(() => {
      this.router.navigate(['../checkout', this.dataSource.data[0].table_id])
      console.log(this.dataSource.data)
      this.closeAllDialog()
    });
  }
}
