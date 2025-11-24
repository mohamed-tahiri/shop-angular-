import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppPlaceholderComponent } from './pages/home/app-placeholder.component';
import { LoginPageComponent } from './pages/auth/login/login.component';
import { ProductsPageComponent } from './pages/products/products.component';

// Nouveaux composants
import { CartPageComponent } from './pages/cart/cart.component';
import { Step2AddressComponent } from './pages/checkout/step2-address.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WishlistPageComponent } from './pages/wishlist/wishlist.component';
import { DevIndexComponent } from './pages/dev-tools/dev-index.component';
import { DevAuthComponent } from './pages/dev-tools/dev-auth.component';
import { DevProductsComponent } from './pages/dev-tools/dev-products.component';
import { DevProductRatingComponent } from './pages/dev-tools/dev-product-rating.component';
import { Step1SummaryComponent } from './pages/checkout/step1-summary.component';
import { Step3ConfirmComponent } from './pages/checkout/step3-confirm.component';
import { ProductRatingPageComponent } from './pages/products/rating/product-rating.component';
import { ProductDetailsPageComponent } from './pages/products/details/product-details.component';
import { CheckoutGuard } from './core/guards/checkout.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  
  // dev -- parte 
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  
  // app -- parte
  { path: 'app', component: AppPlaceholderComponent },
  { path: 'app/login', component: LoginPageComponent },

  // Routes protégées avec AuthGuard
  { path: 'app/shop/products', component: ProductsPageComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/products/rating', component: ProductRatingPageComponent, canActivate: [AuthGuard] },
  { path: 'app/shop/products/:id', component: ProductDetailsPageComponent, canActivate: [AuthGuard] },

  // cart
  { path: 'app/shop/cart', component: CartPageComponent, canActivate: [AuthGuard] },
  
  // wishlist
  { path: 'app/shop/wishlist', component: WishlistPageComponent, canActivate: [AuthGuard] },
  
  // shop checkout
  { path: 'app/shop/checkout/summary', component: Step1SummaryComponent, canActivate: [AuthGuard, CheckoutGuard] },
  { path: 'app/shop/checkout/address', component: Step2AddressComponent, canActivate: [AuthGuard, CheckoutGuard] },
  { path: 'app/shop/checkout/confirm', component: Step3ConfirmComponent, canActivate: [AuthGuard, CheckoutGuard] },

  { path: '**', redirectTo: '' },
];
