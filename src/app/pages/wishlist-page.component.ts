import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectWishlistItems } from '../state/wishlist/wishlist.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from '../shared/components/products-list/products-list.component';
import { Product } from '../../mocks/data';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsListComponent],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-6xl mx-auto space-y-8">

        <h2 class="text-3xl font-bold text-gray-900">Your Wishlist</h2>

        <!-- Wishlist items -->
        <div *ngIf="(wishlistItems$ | async)?.length; else emptyWishlist" class="space-y-6">
          <div class="grid gap-6">
            <app-products-list [products]="(wishlistItems$ | async) || []" [loading]="false"></app-products-list>
          </div>
        </div>

        <!-- Empty Wishlist -->
        <ng-template #emptyWishlist>
          <div class="text-center py-16">
            <p class="text-gray-500 text-lg">Your wishlist is empty.</p>
            <button
              class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm transition"
              (click)="router.navigate(['/app/shop/products'])"
            >
              Continue Shopping
            </button>
          </div>
        </ng-template>

      </div>
    </div>
  `
})
export class WishlistPageComponent {
  private store = inject(Store);
  public router = inject(Router);

  wishlistItems$: Observable<Product[]> = this.store.select(selectWishlistItems);
}
