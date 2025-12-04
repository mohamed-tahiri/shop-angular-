import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProfilePageComponent } from './profile/profile.component';
import { OrdersPageComponent } from './orders/orders.component';
import { OrderDetailsPageComponent } from './orders/order-details.component';

const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailsPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
