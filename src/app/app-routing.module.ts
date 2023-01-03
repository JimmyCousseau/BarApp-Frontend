import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { HistoryComponent } from './Components/history/history.component';
import { KitchenComponent } from './Components/kitchen/kitchen.component';
import { LoginComponent } from './Components/login/login.component';
import { MapOrdersComponent } from './Components/map-orders/map-orders.component';
import { MenuComponent } from './Components/menu/menu.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ParametersComponent } from './Components/parameters/parameters.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { UnknownPageComponent } from './Components/unknown-page/unknown-page.component';
import { AuthGuard } from './Services/Security/auth.guard';
import { HasRoleGuard } from './Services/Security/has-role.guard';

const routes: Routes = [
  {
    path: 'menu', component: MenuComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: "can_access_menu" }
  },
  {
    path: 'orders', component: OrdersComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: "can_access_orders" }
  },
  {
    path: 'map-orders', component: MapOrdersComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: "can_access_orders" }
  },
  {
    path: 'parameters', component: ParametersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout', component: CheckoutComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: "can_access_checkout" }
  },
  {
    path: 'kitchen', component: KitchenComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: "can_access_kitchen" }
  },
  {
    path: 'history', component: HistoryComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: "can_access_history" }
  },
  {
    path: 'statistics', component: StatisticsComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: "can_access_statistics" }
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: UnknownPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
