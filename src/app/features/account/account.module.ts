import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { ProfilePageComponent } from './profile/profile.component';
import { OrdersPageComponent } from './orders/orders.component';
import { OrderDetailsPageComponent } from './orders/order-details.component';

@NgModule({
  imports: [
    CommonModule, 
    AccountRoutingModule,
    ProfilePageComponent, 
    OrdersPageComponent, 
    OrderDetailsPageComponent
  ]
})
export class AccountModule {}
