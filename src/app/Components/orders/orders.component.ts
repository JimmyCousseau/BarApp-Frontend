import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../../Interfaces/Order';
import { User } from '../../Interfaces/User';
import { OrderService } from '../../Services/ComponentService/OrderService';
import { AuthService } from '../../Services/Security/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordersPending: Order[] = [];
  oldIdTable: number = -1;
  grey: boolean = true;
  tables: number[] = [];
  currentUser: User = { Username: '', Password: '', Role: '' };

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = AuthService.getUser();
    this.orderService.findAllBy(this.currentUser.Username).subscribe(data => {
      this.ordersPending = data;
      this.tables.splice(0, this.tables.length)
      this.ordersPending.forEach(order => {
        if (!this.tables.includes(order.IDTable)) {
          this.tables.push(order.IDTable);
        }
      })
    })
  }

  private refresh(): void {
    this.ngOnInit()
    this.dialog.closeAll()
  }

  deleteProduct(idtable: number, intitule: string): void {
    this.orderService.delete(this.currentUser.Username, idtable, intitule).subscribe(() => {
      this.refresh()
    });
  }

  reduceQuantiteInOrder(order: Order): void {
    if (order.Quantite > 0)
      order.Quantite--
  }

  incrementProductQuantity(order: Order): void {
    order.Quantite++
  }

  orderDealtByTable(tableID: number): void {
    this.orderService.updateEtatByTable(tableID, AuthService.getUser().Username).subscribe(() => {
      this.refresh()
    });
  }

  orderDealtByOrder(order: Order): void {
    this.orderService.update(order).subscribe(() => {
      this.refresh()
    });
  }

  updateOrder(order: Order): void {
    if (order.Quantite == 0)
      this.deleteProduct(order.IDTable, order.Intitule)
    else
      this.orderService.update(order).subscribe(() => {
        this.refresh()
      })
  }

  openActionDialog(ref: TemplateRef<any>, data: Order): void {
    this.dialog.open(ref, { data: { ...data } });
  }

  getOrdersByTable(tableID: number): Order[] {
    let orders: Order[] = [];
    this.ordersPending.forEach((order: Order) => {
      if (order.IDTable == tableID) {
        orders.push(order);
      }
    })
    return orders;
  }

  closeAllDialog() { this.dialog.closeAll(); }
}
