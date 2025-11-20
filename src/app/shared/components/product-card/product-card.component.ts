import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom, map } from 'rxjs';
import { Product } from '../../../../mocks/data';
import { selectWishlistItems } from '../../../state/wishlist/wishlist.selectors';
import { addToWishlist, removeFromWishlist } from '../../../state/wishlist/wishlist.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule, CurrencyPipe, DatePipe, NgClass],
  template: `
    <div 
      (click)="goToDetail()"
      class="relative shadow">

      <div class="relative w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
        <img *ngIf="product.image_url" [src]="product.image_url" alt="{{ product.name }}" class="object-cover w-full h-full" />
        <div *ngIf="!product.image_url" class="text-gray-400 text-lg">No Image</div>
        <button
          class="absolute top-2 w-10 h-10 flex items-center justify-center right-2 z-10 bg-white/90 rounded-full p-2 shadow-md hover:scale-110 transition"
          (click)="toggleWishlist($event)"
        >
          <span
            class="text-2xl"
            [ngClass]="{
              'text-red-500': isInWishlist$ | async,
              'text-gray-400 hover:text-red-500': !(isInWishlist$ | async)
            }"
          >
    {{ (isInWishlist$ | async) ? '❤️' : '🤍' }}
  </span>
</button>

      </div>

      <!-- Content -->
      <div class="p-4 flex flex-col gap-2 flex-1">

        <!-- Title & Price -->
        <div class="flex justify-between items-center">
          <h3 class="text-base font-semibold line-clamp-2">{{ product.name }}</h3>
        </div>
        
        <!-- Owner & Created date -->
         <div>
          <p class="text-sm text-gray-500">
            Prix: {{ product.price | currency:'EUR' }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500">
            Owner: {{ product.owner_id }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500">
            Created: {{ product.created_at | date:'short' }}
          </p>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-2 mt-2">
          <mat-chip color="primary" selected>
            Avg Rating: {{ avgRating !== 'N/A' ? avgRating : 'No ratings' }}
          </mat-chip>

          <span *ngIf="avgRating !== 'N/A'" class="text-yellow-400 text-lg">
            <ng-container *ngFor="let star of starsArray">
              {{ star }}
            </ng-container>
          </span>
        </div>

      </div>
    </div>
  `,
})
export class ProductCardComponent implements OnInit {
  @Input({ required: true }) product!: Product;

  private store = inject(Store);
  private router = inject(Router);

  wishlistItems$!: Observable<Product[]>;
  isInWishlist$!: Observable<boolean>;
  starsArray: string[] = [];

  ngOnInit() {
    this.wishlistItems$ = this.store.select(selectWishlistItems);
    this.isInWishlist$ = this.wishlistItems$.pipe(
      map(items => !!items.find(i => i.id === this.product.id))
    );

    this.updateStars();
  }

  get avgRating(): number | 'N/A' {
    const ratings = this.product?.ratings;
    if (!ratings || ratings.length === 0) return 'N/A';
    
    const sum = ratings.reduce((acc, r) => acc + r.value, 0);
    return +(sum / ratings.length).toFixed(1);
  }

  updateStars() {
    const ratingValue = this.avgRating;
    let roundedRating = 0;

    if (typeof ratingValue === 'number') {
      roundedRating = Math.round(ratingValue);
    }
    
    this.starsArray = Array.from({ length: 5 }, (_, i) => (i < roundedRating ? '★' : '☆'));
  }

  goToDetail() {
    this.router.navigate(['/app/shop/products', this.product.id]);
  }

  async toggleWishlist(event: Event) {
    event.stopPropagation();
    const inWishlist = await firstValueFrom(this.isInWishlist$);
    if (inWishlist) {
      this.store.dispatch(removeFromWishlist({ productId: this.product.id }));
    } else {
      this.store.dispatch(addToWishlist({ product: this.product }));
    }
  }
}
