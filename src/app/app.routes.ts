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


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'app', component: AppPlaceholderComponent },
  { path: 'app/login', component: LoginPageComponent},
  { path: 'app/shop/products', component: ProductsPageComponent},
  { path: 'app/shop/products/rating', component: ProductRatingPageComponent},
  { path: '**', redirectTo: '' },
];
