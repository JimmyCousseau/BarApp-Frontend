import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HasRoleGuard } from './core/guards/has-role.guard';
import { Permission } from './core/Interfaces/Role';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  {
    path: 'menu', loadChildren: () => import('./features/menu/menu.module').then(m => m.MenuModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_MENU },
  },
  {
    path: 'checkout/:id', loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_CHECKOUT },
  },
  {
    path: 'history', loadChildren: () => import('./features/history/history.module').then(m => m.HistoryModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_HISTORY }
  },
  {
    path: 'kitchen', loadChildren: () => import('./features/kitchen/kitchen.module').then(m => m.KitchenModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_KITCHEN },
  },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  {
    path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_ORDERS }
  },
  {
    path: 'parameters', loadChildren: () => import('./features/parameters/parameters.module').then(m => m.ParametersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics', loadChildren: () => import('./features/statistics/statistics.module').then(m => m.StatisticsModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: { permission: Permission.ACCESS_STATISTICS },
  },
  { path: '**', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
