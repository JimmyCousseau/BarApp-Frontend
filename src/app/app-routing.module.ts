import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/Security/auth.guard';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { HistoryComponent } from './Components/history/history.component';
import { LoginComponent } from './Components/login/login.component';
import { MenuComponent } from './Components/menu/menu.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ParametersComponent } from './Components/parameters/parameters.component';
import { HasRoleGuard } from './Services/Security/has-role.guard';

const routes: Routes = [
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
  {
    path: 'checkout', component: CheckoutComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ['Serveur', 'Administrateur'],
    }
  },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
