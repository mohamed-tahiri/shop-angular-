import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';
import { ClickableContainerComponent } from '../../shared/components/UI/clickable-container/clickable-container.component';

@Component({
  standalone: true,
  selector: 'app-dev-index',
  imports: [RouterLink, PageWrapperComponent, ClickableContainerComponent],
  template: `
  <app-page-wrapper>
    <div class="space-y-2">
      <h2 class="text-3xl font-semibold text-gray-900">Dev / MSW — Index</h2>
      <p class="text-gray-500">
        Accédez rapidement aux endpoints de test et à la documentation interne.
      </p>
    </div>

    <nav class="grid sm:grid-cols-1 gap-4">
      <!-- Card Auth -->
      <app-container link="/dev/auth">
        <h3 class="font-medium text-gray-900">Auth</h3>
        <p class="text-gray-500 text-sm mt-1">
          POST /api/auth/token/ (+refresh)
        </p>
      </app-container>

      <!-- Card Accounts / User -->
      <app-container link="/dev/accounts">
        <h3 class="font-medium text-gray-900">Accounts</h3>
        <p class="text-gray-500 text-sm mt-1">
          GET /api/me/ | PATCH /api/me/
        </p>
      </app-container>

      <!-- Card Orders -->
      <app-container link="/dev/orders">
        <h3 class="font-medium text-gray-900">Orders</h3>
        <p class="text-gray-500 text-sm mt-1">
          GET /api/me/orders/ | GET /api/orders/:id/
        </p>
      </app-container>

      <!-- Wishlist -->
      <app-container link="/dev/wishlist">
        <h3 class="font-medium text-gray-900">Wishlist</h3>
        <p class="text-gray-500 text-sm mt-1">
          GET /api/me/wishlist/ | POST /api/me/wishlist/
        </p>
      </app-container>
      
      <!-- Card Products -->
      <app-container link="/dev/products">
        <h3 class="font-medium text-gray-900">Products</h3>
        <p class="text-gray-500 text-sm mt-1">
          GET /api/products/
        </p>
      </app-container>

      <!-- Card Product Details Review -->
      <app-container link="/dev/products/1/reviews">
        <h3 class="font-medium text-gray-900">Products Review</h3>
        <p class="text-gray-500 text-sm mt-1">
          GET /api/products/:id/reviews/ | Post /api/products/:id/reviews/
        </p>
      </app-container>

      <!-- Card Product Rating -->
      <app-container link="/dev/products/1/rating">
        <h3 class="font-medium text-gray-900">Product Rating</h3>
        <p class="text-gray-500 text-sm mt-1">
          GET /api/products/:id/rating/
        </p>
      </app-container>
      
    </nav>

    <div class="pt-4 text-center">
      <button
        type="button"
        routerLink="/"
        class="text-blue-600 hover:underline font-medium"
      >
        ← Retour accueil
      </button>
    </div>
  </app-page-wrapper>
  `,
})
export class DevIndexComponent {}
