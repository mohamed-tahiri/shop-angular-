import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { addItem } from '../../../state/cart/cart.actions';
import * as P from '../../../state/products/products.actions';
import * as ProductSelectors from '../../../state/products/products.selectors';
import { Product } from '../../../../mocks/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { selectCartItems } from '../../../state/cart/cart.selectors';
import { NgIf, AsyncPipe } from '@angular/common';

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
    AsyncPipe
  ],
  template: `
    <section class="mx-auto max-w-5xl px-6 py-16 space-y-6">
      <ng-container *ngIf="product$ | async as product; else loading">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Product Image -->
          <img
            [src]="product.image_url"
            alt="{{ product.name }}"
            class="w-full rounded-2xl border border-gray-200 shadow-sm object-cover max-h-96"
          />

          <!-- Product Details -->
          <div class="space-y-4">
            <h1 class="text-3xl font-semibold text-gray-900">{{ product.name }}</h1>

            <!-- Rating -->
            <p class="text-gray-600">
              Rating: <span class="font-medium">{{ avgRating$ | async }}</span>
            </p>

            <!-- Price -->
            <p class="text-2xl font-bold text-gray-800">\${{ product.price.toFixed(2) }}</p>

            <!-- Stock -->
            <p [ngClass]="stockClass(product.stock)" class="font-medium">
              Stock: {{ product.stock }}
            </p>

            <!-- Quantity & Add to Cart -->
            <div class="flex items-center gap-3 mt-4">
              <input
                type="number"
                [(ngModel)]="quantity"
                min="1"
                [max]="product.stock"
                class="w-20 rounded border px-3 py-2 text-center"
              />
              <button
                mat-flat-button
                color="primary"
                class="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-2 font-medium shadow-sm"
                (click)="addToCart(product)"
              >
                Ajouter au panier
              </button>
            </div>

            <!-- Description -->
            <p class="text-gray-700 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <!-- Created at -->
            <p class="text-sm text-gray-400">Ajouté le: {{ product.created_at | date:'medium' }}</p>
          </div>
        </div>
      </ng-container>

      <ng-template #loading>
        <p class="text-gray-500 text-center">Chargement du produit...</p>
      </ng-template>
    </section>
  `
})
export class ProductDetailsPageComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  product$!: Observable<Product | undefined>;
  avgRating$!: Observable<number | 'N/A'>;
  quantity: number = 1;

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

    // Get current quantity in cart
    let currentQuantity = 0;
    this.store.select(selectCartItems).pipe(
      map(items => {
        const cartItem = items.find(i => i.id === product.id);
        currentQuantity = cartItem ? cartItem.quantity : 0;
      }),
    ).subscribe().unsubscribe(); // quick synchronous check

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
}
