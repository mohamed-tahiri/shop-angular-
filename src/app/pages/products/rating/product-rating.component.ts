import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as P from '../../../state/products/products.actions';
import * as ProductSelectors from '../../../state/products/products.selectors';
import { Product } from '../../../../mocks/data';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'product-rating-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
    AsyncPipe
  ],
  template: `
    <section class="mx-auto max-w-4xl px-6 py-16 space-y-6">

      <h2 class="text-3xl font-semibold text-gray-900">Consulter la note d’un produit</h2>

      <!-- Input & Fetch Button -->
      <div class="flex flex-col sm:flex-row gap-4 items-end">
        <mat-form-field class="flex-1">
          <mat-label>Product ID</mat-label>
          <input matInput type="number" [(ngModel)]="productId" min="1" />
        </mat-form-field>

        <button
          mat-flat-button
          color="primary"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 py-3 font-medium shadow-sm"
          (click)="fetch()"
        >
          Fetch
        </button>
      </div>

      <!-- Loading Spinner -->
      <div *ngIf="loading$ | async" class="flex justify-center mt-6">
        <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      </div>

      <!-- Rating Display -->
      <div *ngIf="rating$ | async as rating" class="mt-6">
        <mat-card class="p-6 rounded-2xl shadow-sm bg-white border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">Produit #{{ productId }}</h3>
          <p class="text-gray-700 mt-2">
            Note moyenne: <span class="font-medium">{{ rating.avg_rating }}</span> ⭐
          </p>
          <p class="text-gray-500 text-sm mt-1">Nombre d’avis: {{ rating.count }}</p>
        </mat-card>
      </div>
    </section>
  `
})
export class ProductRatingPageComponent implements OnInit {
  productId = 1;
  product$!: Observable<Product | null>;
  rating$!: Observable<{ avg_rating: number; count: number } | null>;
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.updateObservables();
  }

  fetch() {
    this.store.dispatch(P.loadRating({ id: Number(this.productId) }));
    this.updateObservables();
  }

  private updateObservables() {
    this.rating$ = this.store.select(ProductSelectors.selectProductRating(this.productId));
    this.product$ = this.store.select(ProductSelectors.selectProduct(this.productId));
  }
}
