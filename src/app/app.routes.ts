import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';
import { LoginPageComponent } from './pages/login.component';
import { ProductsPageComponent } from './pages/app-products.component';
import { ProductRatingPageComponent } from './pages/app-product-rating.component';

// Nouveaux composants
import { ProductDetailsPageComponent } from './pages/product-details/product-details-page.component';
import { CartPageComponent } from './pages/cart-page.component';
import { Step1SummaryComponent } from './pages/checkout/step1-summary.component';
import { Step2AddressComponent } from './pages/checkout/step2-address.component';
import { Step3ConfirmComponent } from './pages/checkout/step3-confirm.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WishlistPageComponent } from './pages/wishlist-page.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'app', component: AppPlaceholderComponent },
  { path: 'app/login', component: LoginPageComponent },

  // Routes protégées avec AuthGuard
  { path: 'app/shop/products', component: ProductsPageComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/products/rating', component: ProductRatingPageComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/products/:id', component: ProductDetailsPageComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/wishlist', component: WishlistPageComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/checkout/summary', component: Step1SummaryComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/checkout/address', component: Step2AddressComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/checkout/confirm', component: Step3ConfirmComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' },
];
