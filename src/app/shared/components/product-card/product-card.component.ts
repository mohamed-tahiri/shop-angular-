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
import { loadReviews, postReview } from '../../../state/products/products.actions';
import { selectProductReviews } from '../../../state/products/products.selectors';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule, CurrencyPipe, DatePipe, NgClass],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
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
    this.router.navigate(['/shop/products', this.product.id]);
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
