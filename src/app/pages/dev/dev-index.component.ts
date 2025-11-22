import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dev-index',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-16 space-y-8">
      <div class="space-y-2">
        <h2 class="text-3xl font-semibold text-gray-900">Dev / MSW — Index</h2>
        <p class="text-gray-500">
          Accédez rapidement aux endpoints de test et à la documentation interne.
        </p>
      </div>

      <nav class="grid sm:grid-cols-1 gap-4">
        <!-- Card Auth -->
        <button
          type="button"
          routerLink="/dev/auth"
          class="
            w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-left
            shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200
          "
        >
          <h3 class="font-medium text-gray-900">Auth</h3>
          <p class="text-gray-500 text-sm mt-1">
            POST /api/auth/token/ (+refresh)
          </p>
        </button>

        <!-- Card Products -->
        <button
          type="button"
          routerLink="/dev/products"
          class="
            w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-left
            shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200
          "
        >
          <h3 class="font-medium text-gray-900">Products</h3>
          <p class="text-gray-500 text-sm mt-1">
            GET /api/products/
          </p>
        </button>

        <!-- Card Product Rating -->
        <button
          type="button"
          routerLink="/dev/products/1/rating"
          class="
            w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-left
            shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200
          "
        >
          <h3 class="font-medium text-gray-900">Product Rating</h3>
          <p class="text-gray-500 text-sm mt-1">
            GET /api/products/:id/rating/
          </p>
        </button>
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
    </section>
  `,
})
export class DevIndexComponent {}
