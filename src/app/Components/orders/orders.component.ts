import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Order } from '../../Interfaces/Order';
import { OrderService } from '../../Services/ComponentService/order.service';
import { AuthService } from '../../Services/Security/auth.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  readonly contentOldCell: string[] = []

  ordersPending: Order[] = [];
  oldIdTable: number = -1;
  tables: number[] = [];
  displayedColumns = ['intitule', 'quantite', 'etat']

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dialog.closeAll()
    this.orderService.findAllBy(AuthService.getUser().username).subscribe(data => {
      this.ordersPending = data;
      console.log(data)
      this.tables = this.ordersPending.map(order => order.table_id).filter((v, i, s) => s.indexOf(v) === i)
    })
  }

  private refresh(): void {
    this.ngOnInit()
    this.dialog.closeAll()
  }

  deleteProduct(idtable: number, intitule: string): void {
    this.orderService.delete(AuthService.getUser().username, idtable, intitule).subscribe(() => {
      this.refresh()
    });
  }

  reduceQuantiteInOrder(order: Order): void {
    if (order.amount > 0)
      order.amount--
  }

  incrementProductQuantity(order: Order): void {
    order.amount++
  }

  orderDealtByTable(tableID: number): void {
    this.orderService.updateStateByTable(tableID, AuthService.getUser().username).subscribe(() => {
      this.router.navigate(['../checkout', tableID])
    });
  }

  updateOrder = (order: Order): void => {
    if (order.amount == 0)
      this.deleteProduct(order.table_id, order.name)
    else
      this.orderService.update(order).subscribe(() => {
        this.refresh()
      })
  }

  openActionDialog(ref: TemplateRef<any>, foo: ((args: any) => void) | undefined, data: any): void {
    this.dialog.open(ref, { data: { foo: foo, data: { ...data } } });
  }

  getDataSource(table: number): MatTableDataSource<Order> {
    return new MatTableDataSource<Order>(this.ordersPending.filter((order) => order.table_id === table))
  }

  closeAllDialog() { this.dialog.closeAll(); }

  redirectDialogValidation(func: ((arg: string) => void), data: string): void {
    if (func !== undefined)
      func(data)
    this.dialog.closeAll()
  }

  setStateOrderPage() { this.appComponent.setLastStateOrderPage("map") }

}
