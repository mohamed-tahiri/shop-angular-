import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CheckoutGuard } from '../../core/guards/checkout.guard';

import { ProductsPageComponent } from './products/products.component';
import { ProductDetailsPageComponent } from './products/details/product-details.component';
import { CartPageComponent } from './cart/cart.component';
import { WishlistPageComponent } from './wishlist/wishlist.component';
import { Step1SummaryComponent } from './checkout/step1-summary.component';
import { Step2AddressComponent } from './checkout/step2-address.component';
import { Step3ConfirmComponent } from './checkout/step3-confirm.component';
import { ProductRatingPageComponent } from './products/rating/product-rating.component';

const routes: Routes = [
  { path: 'products', component: ProductsPageComponent, canActivate: [AuthGuard] },
  { path: 'products/rating', component: ProductRatingPageComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailsPageComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistPageComponent, canActivate: [AuthGuard] },
  { path: 'checkout/summary', component: Step1SummaryComponent, canActivate: [AuthGuard, CheckoutGuard] },
  { path: 'checkout/address', component: Step2AddressComponent, canActivate: [AuthGuard, CheckoutGuard] },
  { path: 'checkout/confirm', component: Step3ConfirmComponent, canActivate: [AuthGuard, CheckoutGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
