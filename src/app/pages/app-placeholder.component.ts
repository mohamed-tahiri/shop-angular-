import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-16 space-y-6">
      <!-- Title -->
      <h2 class="text-3xl font-semibold text-gray-900">App Shop — Placeholder</h2>

      <!-- Navigation Buttons -->
      <nav class="grid gap-4 mt-6">
        <button
          type="button"
          routerLink="/dev"
          class="w-full text-left rounded-2xl border border-gray-200 bg-white px-6 py-4
                 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
        >
          → Aller à la zone de tests
        </button>

        <button
          type="button"
          routerLink="/app/login"
          class="w-full text-left rounded-2xl border border-gray-200 bg-white px-6 py-4
                 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
        >
          → Aller à la page de login de l’application
        </button>

        <button
          type="button"
          routerLink="/"
          class="w-full text-left rounded-2xl border border-gray-200 bg-white px-6 py-4
                 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
        >
          ← Retour accueil
        </button>
      </nav>
    </section>
  `,
})
export class AppPlaceholderComponent {}
