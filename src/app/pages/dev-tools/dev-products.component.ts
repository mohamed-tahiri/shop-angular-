import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';

interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
}
interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Component({
  standalone: true,
  selector: 'app-dev-products',
  imports: [JsonPipe, FormsModule, RouterLink, NgIf, PageWrapperComponent],
  template: `
  <app-page-wrapper>
    <!-- Navigation -->
    <nav class="flex gap-4 text-sm text-blue-600">
      <button type="button" routerLink="/dev" class="hover:underline">
        ← Dev index
      </button>
      <button type="button" routerLink="/" class="hover:underline">Accueil</button>
      <button type="button" routerLink="/dev/products/1/rating" class="hover:underline">
        Voir rating #1
      </button>
    </nav>

    <!-- Title -->
    <h2 class="text-3xl font-semibold text-gray-900">GET /api/products/</h2>

    <!-- Form -->
    <form
      class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6"
      (submit)="$event.preventDefault(); load()"
    >
      <label class="text-sm">
        page
        <input
          class="mt-1 w-full rounded border px-2 py-1"
          type="number"
          [(ngModel)]="page"
          name="page"
        />
      </label>
      <label class="text-sm">
        page_size
        <input
          class="mt-1 w-full rounded border px-2 py-1"
          type="number"
          [(ngModel)]="pageSize"
          name="pageSize"
        />
      </label>
      <label class="text-sm">
        min_rating
        <input
          class="mt-1 w-full rounded border px-2 py-1"
          type="number"
          step="0.1"
          [(ngModel)]="minRating"
          name="minRating"
        />
      </label>
      <label class="text-sm md:col-span-2">
        ordering
        <input
          class="mt-1 w-full rounded border px-2 py-1"
          type="text"
          [(ngModel)]="ordering"
          name="ordering"
          placeholder="-created_at|price|name"
        />
      </label>
      <div class="flex items-end">
        <button
          type="button"
          class="rounded-2xl bg-blue-600 px-4 py-2 text-white font-medium shadow-sm
                  hover:bg-blue-700 transition-all duration-200"
          (click)="load()"
        >
          Fetch
        </button>
      </div>
    </form>

    <!-- Response -->
    <div *ngIf="resp()" class="mt-6">
      <div class="text-sm text-gray-600 mb-2">Count: {{ resp()?.count }}</div>
      <pre class="rounded-2xl bg-gray-50 p-4 text-sm shadow-sm overflow-auto">
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
export class DevProductsComponent {
  page = 1;
  pageSize = 10;
  minRating = 0;
  ordering = '-created_at';

  readonly resp = signal<Paginated<Product> | null>(null);
  readonly err = signal<string | null>(null);

  async load(): Promise<void> {
    this.err.set(null);
    this.resp.set(null);
    const q = new URLSearchParams({
      page: String(this.page),
      page_size: String(this.pageSize),
      min_rating: String(this.minRating),
      ordering: this.ordering,
    });
    const res = await fetch(`/api/products/?${q.toString()}`);
    if (!res.ok) {
      this.err.set(`${res.status} ${res.statusText}`);
      return;
    }
    const data = (await res.json()) as Paginated<Product>;
    this.resp.set(data);
  }
}
