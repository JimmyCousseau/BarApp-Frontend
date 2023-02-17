import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenRoutingModule } from './kitchen-routing.module';
import { KitchenComponent } from './kitchen.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    KitchenComponent
  ],
  imports: [
    CommonModule,
    KitchenRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    SharedModule,
    MatButtonModule,
  ]
})
export class KitchenModule { }
