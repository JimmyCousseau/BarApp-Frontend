import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { OrdersComponent } from './main/orders.component';
import { ListOrdersComponent } from './list/list-orders.component';
import { MapOrdersComponent } from './map/map-orders.component';


@NgModule({
  declarations: [
    OrdersComponent,
    ListOrdersComponent,
    MapOrdersComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    SharedModule,
    MatButtonModule,
  ]
})
export class OrdersModule { }
