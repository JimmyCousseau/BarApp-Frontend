import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { Permission } from './core/Interfaces/Role';
import { AuthGuard } from './core/guards/auth.guard';
import { HasRoleGuard } from './core/guards/has-role.guard';

const routes: Routes = [
  { path: '', component: UnknownPageComponent },
  {
    path: 'menu', component: MenuComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_MENU }
  },
  {
    path: 'orders', component: OrdersComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_ORDERS }
  },
  {
    path: 'map-orders', component: MapOrdersComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_ORDERS }
  },
  {
    path: 'parameters', component: ParametersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout/:id', component: CheckoutComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_CHECKOUT }
  },
  {
    path: 'kitchen', component: KitchenComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_KITCHEN }
  },
  {
    path: 'history', component: HistoryComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_HISTORY }
  },
  {
    path: 'statistics', component: StatisticsComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_STATISTICS }
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: UnknownPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
