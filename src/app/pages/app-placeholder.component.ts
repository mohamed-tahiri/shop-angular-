import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-10 space-y-4">
      <h2 class="text-2xl font-semibold">App Shop — Placeholder</h2>
      <nav class="space-y-2">
        <div>
          <button type="button" routerLink="/dev" class="rounded border px-3 py-2 hover:bg-gray-50">
            → Aller à la zone de tests
          </button>
        </div>
        <div>
          <button type="button" routerLink="/app/login" class="rounded border px-3 py-2 hover:bg-gray-50">
            → Aller à la page de login de l’application
          </button>
        </div>
        <div>
          <button type="button" routerLink="/" class="rounded border px-3 py-2 hover:bg-gray-50">
            ← Retour accueil
          </button>
        </div>
      </nav>
    </section>
  `,
})
export class AppPlaceholderComponent {}
