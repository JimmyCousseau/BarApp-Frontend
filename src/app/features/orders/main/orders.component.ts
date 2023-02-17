import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/core/http/order.service';
import { Order } from 'src/app/core/Interfaces/Order';
import { OrderPageService } from 'src/app/shared/services/order-page.service';
import { Dialog } from '../../../shared/components/dialog/Dialog';

@Component({
  selector: 'app-orders',
  styles: [
    `.change-view-map-list { 
        display: inline-flex; 
        justify-content: right; 
        cursor: pointer;
        position: relative;
        left: 90%;

        mat-icon { 
          background-color: white; 
          border-radius: 7px; 
          padding: 8px 10px; 
        }
      }`,
  ],
  template: `
    <div class="change-view-map-list" (click)="swapStylePage()">
        <mat-icon *ngIf="sharedStylePage === 'map'">list</mat-icon>
        <mat-icon *ngIf="sharedStylePage === 'list'">map</mat-icon>
    </div>
    <app-map-orders *ngIf="sharedStylePage === 'map'"></app-map-orders>
    <app-list-orders *ngIf="sharedStylePage === 'list'"></app-list-orders>
  `,
})
export class OrdersComponent extends Dialog implements OnInit {

  protected orders: Order[] = []
  sharedStylePage: "map" | "list" = "list"

  constructor(
    protected orderService: OrderService,
    protected orderPageService: OrderPageService,
    protected override dialog: MatDialog,
  ) {
    super(dialog)
  }

  override ngOnInit(): void {
    this.dialog.closeAll()
    this.orderService.findAllPendingBy().subscribe((data: Order[]) => {
      this.orders = data
    })
    this.orderPageService.sharedStylePage.subscribe((style: "map" | "list") => {
      this.sharedStylePage = style
    })
  }

  swapStylePage(): void { this.orderPageService.swapStylePage() }
}
