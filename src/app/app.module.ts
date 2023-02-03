import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './core/components/checkout/checkout.component';
import { HistoryComponent } from './core/components/history/history.component';
import { KitchenComponent } from './core/components/kitchen/kitchen.component';
import { LoginComponent } from './core/components/login/login.component';
import { MapOrdersComponent } from './core/components/map-orders/map-orders.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { OrdersComponent } from './core/components/orders/orders.component';
import { ParametersComponent } from './core/components/parameters/parameters.component';
import { StatisticsComponent } from './core/components/statistics/statistics.component';
import { UnknownPageComponent } from './core/components/unknown-page/unknown-page.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { httpInterceptorProviders } from './core/interceptor';

import { AreYouSureTemplateComponent } from './shared/components/are-you-sure-template/are-you-sure-template.component';
import { BaseTemplateComponent } from './shared/components/base-template/base-template.component';
import { HistoryTemplateComponent } from './shared/components/history-template/history-template.component';
import { LabelTemplateComponent } from './shared/components/label-template/label-template.component';
import { ModProdInOrderTemplateComponent } from './shared/components/mod-prod-in-order-template/mod-prod-in-order-template.component';
import { ModifyRoleTemplateComponent } from './shared/components/modify-role-template/modify-role-template.component';
import { OrderTableTemplateComponent } from './shared/components/order-table-template/order-table-template.component';
import { PasswordTemplateComponent } from './shared/components/password-template/password-template.component';
import { ProductForm } from './shared/components/product-form/product-form.components';
import { SectionTemplateComponent } from './shared/components/section-template/section-template.component';
import { SetPencilTemplateComponent } from './shared/components/set-pencil-template/set-pencil-template.component';
import { QRCodeModule } from 'angularx-qrcode';

registerLocaleData(localeFr, 'fr-CA');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrdersComponent,
    CheckoutComponent,
    LoginComponent,
    ParametersComponent,
    HistoryComponent,
    UnknownPageComponent,
    KitchenComponent,
    StatisticsComponent,
    MapOrdersComponent,
    BaseTemplateComponent,
    HistoryTemplateComponent,
    PasswordTemplateComponent,
    SetPencilTemplateComponent,
    ModProdInOrderTemplateComponent,
    ProductForm,
    SectionTemplateComponent,
    AreYouSureTemplateComponent,
    ModifyRoleTemplateComponent,
    LabelTemplateComponent,
    OrderTableTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatGridListModule,
    NgChartsModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    QRCodeModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
