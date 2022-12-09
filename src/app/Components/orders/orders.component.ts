import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../Interfaces/User';
import { OrderService } from '../../Services/ComponentService/OrderService';
import { Order } from '../../Interfaces/Order';
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
    this.orderService.getOrdersPending().subscribe(data => {
      this.ordersPending = data;
      this.ordersPending.forEach(order => {
        if (!this.tables.includes(order.IDTable)) {
          this.tables.push(order.IDTable);
        }
      })
    })
  }

  deleteProductInOrderSnack(idtable: number, intitule: string): void {
    let snack = this.snackBar.open("Êtes-vous sûr de vouloir supprimer ce produit de la commande ?", "Oui", {
      duration: 3000,
      horizontalPosition: "start",
    })

    snack.onAction().subscribe(() => {
      this._deleteProductInOrder(idtable, intitule);
      this.dialog.closeAll();
    })
  }

  private _deleteProductInOrder(idtable: number, intitule: string): void {
    this.orderService.deleteProductInOrder(this.currentUser.Username, idtable, intitule).subscribe(() => {
      this.ngOnInit();
    });
  }

  markOrderDealt(order: Order): void {
    order.Serveur = this.currentUser.Username;
    this.orderService.updateOrderDealt(order).subscribe(() => {
      this.ngOnInit();
      this.dialog.closeAll();
    });
  }

  openActionDialog(ref: TemplateRef<any>, data: Order): void {
    this.dialog.open(ref, { data: data });
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
}
