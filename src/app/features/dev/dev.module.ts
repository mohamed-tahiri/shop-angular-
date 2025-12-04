import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevRoutingModule } from './dev-routing.module';

import { DevIndexComponent } from './dev-index.component';
import { DevAuthComponent } from './dev-auth.component';
import { DevAccountsComponent } from './dev-accounts.component';
import { DevOrdersComponent } from './dev-orders.component';
import { DevWishlistComponent } from './dev-wishlist.component';
import { DevProductsComponent } from './dev-products.component';
import { DevProductReviewsComponent } from './dev-product-review.component';
import { DevProductRatingComponent } from './dev-product-rating.component';

@NgModule({
  imports: [
    CommonModule, 
    DevRoutingModule,    
    DevIndexComponent,
    DevAuthComponent,
    DevAccountsComponent,
    DevOrdersComponent,
    DevWishlistComponent,
    DevProductsComponent,
    DevProductReviewsComponent,
    DevProductRatingComponent
  ]
})
export class DevModule {}
