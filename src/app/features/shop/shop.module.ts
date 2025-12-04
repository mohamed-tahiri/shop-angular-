import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';

import { ProductsPageComponent } from './products/products.component';
import { ProductDetailsPageComponent } from './products/details/product-details.component';
import { CartPageComponent } from './cart/cart.component';
import { WishlistPageComponent } from './wishlist/wishlist.component';
import { Step1SummaryComponent } from './checkout/step1-summary.component';
import { Step2AddressComponent } from './checkout/step2-address.component';
import { Step3ConfirmComponent } from './checkout/step3-confirm.component';

@NgModule({
  imports: [
    CommonModule, 
    ShopRoutingModule,
    ProductsPageComponent,
    ProductDetailsPageComponent,
    CartPageComponent,
    WishlistPageComponent,
    Step1SummaryComponent,
    Step2AddressComponent,
    Step3ConfirmComponent
  ]
})
export class ShopModule {}
