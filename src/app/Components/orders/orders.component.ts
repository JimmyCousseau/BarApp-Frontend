import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../Services/Security/auth.service';
import { Order } from '../../Interfaces/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/Services/ComponentService/OrderService';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordersPending: Order[] = [];
  oldIdTable: number = -1;
  grey: boolean = true;

  constructor(
    private orderService: OrderService,
    private readonly authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.orderService.getOrdersPending().subscribe(data => {
      this.ordersPending = data;
    })
  }

  deleteProductInOrderSnack(idtable: number, intitule: string): void {
    let snack = this.snackBar.open("Êtes-vous sûr de vouloir supprimer ce produit de la commande ?", "Oui", {
      duration: 3000,
      horizontalPosition: "start",
    })

    snack.onAction().subscribe(() => {
      this._deleteProductInOrder(idtable, intitule);
    })
  }

  private _deleteProductInOrder(idtable: number, intitule: string) {
    this.orderService.deleteProductInOrder(this.authService.getUser().Username, idtable, intitule).subscribe(() => {
      this.ngOnInit();
    });
  }

  markOrderDealt(order: Order) {
    order.Serveur = this.authService.getUser().Username;
    this.orderService.updateOrderDealt(order).subscribe(() => {
      this.ngOnInit();
    })
  }

  styleTable(currentTableId: number): string {
    for (let i = 0; i < this.ordersPending.length; i++) {
      if (this.ordersPending[i].IDTable == currentTableId) {
        let b: number = (i / 2) % 2;
        return b ? "grey-tr" : "white-tr";
      }
    }
    return "grey-tr";
  }

  openActionDialog(ref: TemplateRef<any>, data: Order) {
    this.dialog.open(ref, { data: data });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
