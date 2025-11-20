import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectWishlistItems } from '../state/wishlist/wishlist.selectors';
import { ProductsListComponent } from '../shared/components/products-list/products-list.component';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, ProductsListComponent],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto space-y-8">
        <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>
        <app-products-list [products]="(wishlistItems$ | async) || []" [loading]="false"></app-products-list>
        <p *ngIf="(wishlistItems$ | async)?.length === 0" class="text-center text-gray-500 mt-4">
          Your wishlist is empty.
        </p>
      </div>
    </div>
  `
})
export class WishlistPageComponent {
  private store = inject(Store);
  wishlistItems$ = this.store.select(selectWishlistItems);
}
