import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProdInOrderDialog } from './prod-in-order-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    MenuComponent,
    ProdInOrderDialog,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatIconModule,
    SharedModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class MenuModule { }
