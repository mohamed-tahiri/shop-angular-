import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection, isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './state/auth/auth.reducer';
import { productsReducer } from './state/products/products.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { ProductsEffects } from './state/products/products.effects';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { CartEffects } from './state/cart/cart.effects';
import { cartReducer } from './state/cart/cart.reducer';
import { wishlistReducer } from './state/wishlist/wishlist.reducer';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { WishlistEffects } from './state/wishlist/wishlist.effects';
import { adminReducer } from './state/admin/admin.reducer';
import { AdminEffects } from './state/admin/admin.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      {
        auth: authReducer, 
        user: userReducer,
        products: productsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        admin: adminReducer
      }
    ),
    provideEffects([AuthEffects, ProductsEffects, CartEffects, UserEffects, WishlistEffects, AdminEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
