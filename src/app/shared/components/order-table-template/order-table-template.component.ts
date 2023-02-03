import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from '../../../core/Interfaces/Order';
import { OrderService } from '../../../core/http/order.service';
import { BaseTemplateComponent } from '../base-template/base-template.component';

@Component({
  selector: 'app-order-table-template',
  templateUrl: './order-table-template.component.html',
  styles: [],
})
export class OrderTableTemplateComponent extends BaseTemplateComponent {

  @Input()
  override dataSource!: { foo: any, data: Order[] }

  displayedColumns = ['intitule', 'quantite', 'etat', 'note']

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
    this.orderService.updateState(this.dataSource.data[0]).subscribe(() => {
      this.router.navigate(['../checkout', this.dataSource.data[0].table_id])
      this.closeAllDialog()
    });
  }
}
