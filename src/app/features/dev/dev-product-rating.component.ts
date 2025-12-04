import { JsonPipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';

interface RatingResponse {
  product_id: number;
  avg_rating: number;
  count: number;
}

@Component({
  standalone: true,
  selector: 'app-dev-product-rating',
  imports: [FormsModule, RouterLink, JsonPipe, NgIf, PageWrapperComponent],
  template: `
  <app-page-wrapper>
    <!-- Navigation -->
    <nav class="flex gap-4 text-sm text-blue-600">
      <button type="button" routerLink="/dev" class="hover:underline">
        ← Dev index
      </button>
      <button type="button" routerLink="/" class="hover:underline">
        Accueil
      </button>
      <button type="button" routerLink="/dev/products" class="hover:underline">
        Liste produits
      </button>
    </nav>

    <!-- Title -->
    <h2 class="text-3xl font-semibold text-gray-900">
      GET /api/products/:id/rating/
    </h2>

    <!-- Form -->
    <form class="mt-4 flex items-end gap-4" (submit)="$event.preventDefault(); load()">
      <label class="text-sm">
        Product ID
        <input
          class="mt-1 w-28 rounded border px-2 py-1"
          type="number"
          [(ngModel)]="id"
          name="id"
        />
      </label>
      <button
        type="button"
        class="rounded-2xl bg-blue-600 px-4 py-2 text-white font-medium shadow-sm
                hover:bg-blue-700 transition-all duration-200"
        (click)="load()"
      >
        Fetch
      </button>
    </form>

    <!-- Response -->
    <div *ngIf="resp()" class="mt-6">
      <h3 class="text-lg font-medium text-gray-900">Rating Response</h3>
      <pre class="rounded-2xl bg-gray-50 p-4 text-sm shadow-sm overflow-x-auto">
{{ resp() | json }}
      </pre>
    </div>

    <!-- Error -->
    <div *ngIf="err()" class="mt-4 text-red-600 font-medium">
      {{ err() }}
    </div>
  </app-page-wrapper>
  `,
})
export class DevProductRatingComponent {
  id = 1;
  readonly resp = signal<RatingResponse | null>(null);
  readonly err = signal<string | null>(null);

  async load(): Promise<void> {
    this.err.set(null);
    this.resp.set(null);
    const res = await fetch(`/api/products/${this.id}/rating/`);
    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      return;
    }
    const data = (await res.json()) as RatingResponse;
    this.resp.set(data);
  }
}
