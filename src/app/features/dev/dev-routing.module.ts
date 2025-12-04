import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevIndexComponent } from './dev-index.component';
import { DevAuthComponent } from './dev-auth.component';
import { DevAccountsComponent } from './dev-accounts.component';
import { DevOrdersComponent } from './dev-orders.component';
import { DevWishlistComponent } from './dev-wishlist.component';
import { DevProductsComponent } from './dev-products.component';
import { DevProductReviewsComponent } from './dev-product-review.component';
import { DevProductRatingComponent } from './dev-product-rating.component';

const routes: Routes = [
  { path: '', component: DevIndexComponent },
  { path: 'auth', component: DevAuthComponent },
  { path: 'accounts', component: DevAccountsComponent },
  { path: 'orders', component: DevOrdersComponent },
  { path: 'wishlist', component: DevWishlistComponent },
  { path: 'products', component: DevProductsComponent },
  { path: 'products/:id/reviews', component: DevProductReviewsComponent },
  { path: 'products/:id/rating', component: DevProductRatingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevRoutingModule {}
