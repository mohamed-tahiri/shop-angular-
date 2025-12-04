import { Component, signal } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PageWrapperComponent } from '../../shared/components/UI/page-wrappe/page-wrapper.component';
import { Review } from '../../../mocks/data';

@Component({
  standalone: true,
  selector: 'app-dev-product-reviews',
  imports: [FormsModule, JsonPipe, NgIf, RouterLink, PageWrapperComponent],
  template: `
  <app-page-wrapper>
    <!-- Navigation -->
    <nav class="flex gap-4 text-sm text-blue-600">
      <button type="button" routerLink="/dev" class="hover:underline">← Dev index</button>
      <button type="button" routerLink="/" class="hover:underline">Accueil</button>
      <button type="button" routerLink="/dev/products" class="hover:underline">Liste produits</button>
    </nav>

    <!-- Page Title -->
    <h2 class="text-3xl font-semibold text-gray-900">GET & POST /api/products/:id/reviews/</h2>

    <!-- Fetch Reviews -->
    <form (submit)="$event.preventDefault()">
      <label>Product ID
        <input type="number" [(ngModel)]="productId" name="productId" class="border rounded px-2 py-1">
      </label>
      <button type="button" class="ml-2 bg-blue-600 text-white px-3 py-1 rounded" (click)="loadReviews()">Fetch Reviews</button>
    </form>

    <!-- Post Review -->
    <form (submit)="$event.preventDefault()" class="mt-4">
      <label>Rating
        <input type="number" min="1" max="5" [(ngModel)]="reviewValue" name="reviewValue" class="border rounded px-2 py-1">
      </label>
      <label>Comment
        <input type="text" [(ngModel)]="reviewComment" name="reviewComment" class="border rounded px-2 py-1 ml-2">
      </label>
      <button type="button" class="ml-2 bg-green-600 text-white px-3 py-1 rounded" (click)="postReview()">Post Review</button>
    </form>

    <!-- Reviews List -->
    <div *ngIf="reviews()" class="mt-4">
      <h3 class="text-lg font-medium text-gray-900">Reviews</h3>
      <pre class="rounded bg-gray-50 p-4 shadow-sm overflow-x-auto">{{ reviews() | json }}</pre>
    </div>

    <!-- Posted Review -->
    <div *ngIf="postResp()" class="mt-4">
      <h3 class="text-lg font-medium text-gray-900">Posted Review</h3>
      <pre class="rounded bg-gray-50 p-4 shadow-sm overflow-x-auto">{{ postResp() | json }}</pre>
    </div>

    <!-- Error Message -->
    <div *ngIf="err()" class="mt-4 text-red-600 font-medium">{{ err() }}</div>
  </app-page-wrapper>
  `,
})
export class DevProductReviewsComponent {
  productId = 1;
  reviewValue = 5;
  reviewComment = '';

  readonly reviews = signal<Review[] | null>(null);
  readonly postResp = signal<Review | null>(null);
  readonly err = signal<string | null>(null);

  async loadReviews() {
    this.err.set(null);
    this.reviews.set(null);
    try {
      const res = await fetch(`/api/products/${this.productId}/reviews/`);
      if (!res.ok) {
        this.err.set(`${res.status} ${res.statusText}`);
        return;
      }
      const data = await res.json() as Review[];
      this.reviews.set(data);
    } catch (error: any) {
      this.err.set(error.message || 'Erreur inconnue');
    }
  }

  async postReview() {
    this.err.set(null);
    this.postResp.set(null);

    // Validation simple avant POST
    if (this.reviewValue < 1 || this.reviewValue > 5) {
      this.err.set('Rating must be between 1 and 5.');
      return;
    }
    if (!this.reviewComment.trim()) {
      this.err.set('Comment cannot be empty.');
      return;
    }

    try {
      const res = await fetch(`/api/products/${this.productId}/reviews/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: this.reviewValue, comment: this.reviewComment }),
      });

      if (!res.ok) {
        const errData = await res.json();
        this.err.set(errData.detail || `${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json() as Review;
      this.postResp.set(data);

      // Reset input
      this.reviewValue = 5;
      this.reviewComment = '';

      // Refresh reviews
      await this.loadReviews();
    } catch (error: any) {
      this.err.set(error.message || 'Erreur inconnue');
    }
  }
}
