import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { addItem } from '../../../../state/cart/cart.actions';
import * as P from '../../../../state/products/products.actions';
import * as ProductSelectors from '../../../../state/products/products.selectors';
import { Product, Review } from '../../../../../mocks/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { selectCartItems } from '../../../../state/cart/cart.selectors';
import { NgIf, AsyncPipe, NgForOf } from '@angular/common';
import { PageWrapperComponent } from '../../../../shared/components/UI/page-wrappe/page-wrapper.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatSnackBarModule,
    NgIf,
    AsyncPipe,
    NgForOf,
    PageWrapperComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsPageComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  product$!: Observable<Product | undefined>;
  avgRating$!: Observable<number | 'N/A'>;
  reviews$!: Observable<Review[]>;
  quantity: number = 1;

  newRating: number = 5;
  newComment: string = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(P.loadProduct({ id }));
    this.product$ = this.store.select(ProductSelectors.selectProduct(id));

    this.avgRating$ = this.product$.pipe(
      map(product => {
        if (!product?.ratings?.length) return 'N/A';
        const sum = product.ratings.reduce((acc, r) => acc + r.value, 0);
        return +(sum / product.ratings.length).toFixed(1);
      })
    );

    // Load reviews
    this.store.dispatch(P.loadReviews({ productId: id }));
    this.reviews$ = this.store.select(ProductSelectors.selectProductReviews(id));
  }

  trackById(index: number, item: any): number {
    return item.id; // clé unique pour chaque produit
  }

  stockClass(stock: number | undefined) {
    if (!stock || stock === 0) return 'text-red-600';
    if (stock <= 5) return 'text-yellow-500';
    return 'text-green-600';
  }

  addToCart(product: Product & { stock: number }) {
    if (product.stock === 0) {
      this.snackBar.open(`${product.name} is out of stock!`, 'Close', { duration: 3000 });
      return;
    }

    let currentQuantity = 0;
    this.store.select(selectCartItems).pipe(
      map(items => {
        const cartItem = items.find(i => i.id === product.id);
        currentQuantity = cartItem ? cartItem.quantity : 0;
      }),
    ).subscribe().unsubscribe();

    if (this.quantity + currentQuantity > product.stock) {
      this.snackBar.open(`You can only add up to ${product.stock - currentQuantity} more units`, 'Close', { duration: 3000 });
      return;
    }

    this.store.dispatch(
      addItem({
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          created_at: product.created_at,
          imageUrl: product.image_url,
          quantity: this.quantity
        }
      })
    );

    this.snackBar.open(`${product.name} added to cart!`, 'Close', { duration: 6000 });
    this.quantity = 1;
  }

  submitReview(productId: number) {
    const trimmedComment = this.newComment.trim();
    if (!trimmedComment) {
      this.snackBar.open('Le commentaire ne peut pas être vide', 'Fermer', { duration: 3000 });
      return;
    }

    const userId = 1;
    this.store.dispatch(P.postReview({
      productId,
      review: {
        user: userId,
        value: this.newRating,
        comment: trimmedComment,
        createdAt: new Date().toISOString()
      }
    }));

    // Reset form
    this.newRating = 5;
    this.newComment = '';
  }
}
