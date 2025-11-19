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

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer, products: productsReducer }),
    provideEffects([AuthEffects, ProductsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
