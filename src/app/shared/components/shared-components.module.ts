import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AreYouSureDialog } from './dialog/are-you-sure-dialog/are-you-sure-dialog.component';
import { BasicProductDialogComponent } from './dialog/basic-product-dialog/basic-product-dialog.component';
import { HeaderDialog } from './dialog/header-dialog/header-dialog.component';
import { LabelDialog } from './dialog/label-dialog/label-dialog.component';
import { OrderDialog } from './dialog/order-dialog/order-dialog.component';
import { PasswordVerificationDialog } from './dialog/password-verification-dialog/password-verification-dialog.component';
import { PencilDialog } from './dialog/pencil-dialog/pencil-dialog.component';
import { ProductDialog } from './dialog/product-dialog/product-dialog.components';
import { RoleDialog } from './dialog/role-dialog/role-dialog.component';
import { SectionDialog } from './dialog/section-dialog/section-dialog.component';
import { OrderTableTemplate } from './templates/order-table-template/order-table-template.component';

@NgModule({
    declarations: [
        AreYouSureDialog,
        BasicProductDialogComponent,
        HeaderDialog,
        LabelDialog,
        OrderDialog,
        PasswordVerificationDialog,
        PencilDialog,
        ProductDialog,
        RoleDialog,
        SectionDialog,
        OrderTableTemplate
    ],
    exports: [
        AreYouSureDialog,
        BasicProductDialogComponent,
        HeaderDialog,
        LabelDialog,
        OrderDialog,
        PasswordVerificationDialog,
        PencilDialog,
        ProductDialog,
        RoleDialog,
        SectionDialog,
        OrderTableTemplate
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
    ],
})
export class SharedComponentsModule { }
