import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';

// Interfaces basées sur la réponse du mock
interface WishlistResponse {
  productIds: number[];
  success?: boolean; // Présent dans la réponse POST
}

@Component({
  standalone: true,
  selector: 'app-dev-wishlist',
  imports: [JsonPipe, FormsModule, RouterLink, NgIf, PageWrapperComponent],
  template: `
    <app-page-wrapper>
      <nav class="flex gap-4 text-sm text-blue-600">
        <button type="button" routerLink="/dev" class="hover:underline">
          ← Dev index
        </button>
        <button type="button" routerLink="/" class="hover:underline">Accueil</button>
      </nav>

      <h2 class="text-3xl font-semibold text-gray-900">Wishlist Endpoints</h2>
      <p class="text-gray-500">Testez GET /api/me/wishlist/ et POST /api/me/wishlist/ (toggle).</p>

      <form
        class="mt-4 flex gap-3 items-end"
        (submit)="$event.preventDefault(); toggle()"
      >
        <label class="text-sm">
          Product ID to Toggle
          <input
            class="mt-1 w-full rounded border px-2 py-1"
            type="number"
            [(ngModel)]="productIdToToggle"
            name="productIdToToggle"
            placeholder="Ex: 1"
          />
        </label>
        <button
          type="button"
          class="rounded-2xl bg-blue-600 px-4 py-2 text-white font-medium shadow-sm
                  hover:bg-blue-700 transition-all duration-200"
          (click)="toggle()"
        >
          POST Toggle
        </button>
      </form>

      <hr class="my-6">

      <div class="flex items-center">
        <button
          type="button"
          class="rounded-2xl bg-green-600 px-4 py-2 text-white font-medium shadow-sm
                  hover:bg-green-700 transition-all duration-200"
          (click)="load()"
        >
          GET /api/me/wishlist/
        </button>
      </div>

      <div *ngIf="resp()" class="mt-6">
        <h3 class="text-xl font-medium text-gray-900 mb-2">Response:</h3>
        <div class="text-sm text-gray-600 mb-2">
            IDs dans la Wishlist ({{ resp()?.productIds?.length }} produits)
        </div>
        <pre class="rounded-2xl bg-gray-50 p-4 text-sm shadow-sm overflow-auto">
{{ resp() | json }}
        </pre>
      </div>

      <div *ngIf="err()" class="mt-4 text-red-600 font-medium">
        {{ err() }}
      </div>
    </app-page-wrapper>
  `,
})
export class DevWishlistComponent {
  productIdToToggle = 1;

  readonly resp = signal<WishlistResponse | null>(null);
  readonly err = signal<string | null>(null);

  /**
   * Effectue un POST pour ajouter ou retirer un produit de la wishlist.
   */
  async toggle(): Promise<void> {
    this.err.set(null);
    this.resp.set(null);

    const res = await fetch(`/api/me/wishlist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: this.productIdToToggle }),
    });

    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      // Tentative de lire le corps de l'erreur pour plus de détails (ex: 400 Bad Request)
      try {
        const errorBody = await res.json();
        this.err.update(e => `${e}: ${JSON.stringify(errorBody)}`);
      } catch {
        // Ignorer si la réponse n'est pas JSON
      }
      return;
    }

    const data = (await res.json()) as WishlistResponse;
    this.resp.set(data);
  }

  /**
   * Effectue un GET pour récupérer l'état actuel de la wishlist.
   */
  async load(): Promise<void> {
    this.err.set(null);
    this.resp.set(null);

    const res = await fetch(`/api/me/wishlist/`);
    
    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      return;
    }

    const data = (await res.json()) as WishlistResponse;
    this.resp.set(data);
  }
}