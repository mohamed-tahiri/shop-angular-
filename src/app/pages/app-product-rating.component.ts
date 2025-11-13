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

import * as P from '../state/products/products.actions';
import * as ProductSelectors from '../state/products/products.selectors';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { Product } from '../../mocks/data';

@Component({
  selector: 'app-product-rating-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ProductCardComponent
  ],
  template: `
    <div class="p-4 min-h-screen bg-gray-50 flex justify-center">
      <div class="w-full max-w-md space-y-6">

        <mat-card class="p-4 space-y-4">
          <h2 class="text-2xl font-semibold text-gray-800">Product Rating</h2>

          <form (ngSubmit)="fetch()" class="flex gap-2 items-center justify-center">
            <mat-form-field appearance="fill" class="flex-1">
              <mat-label>Product ID</mat-label>
              <input matInput type="number" [(ngModel)]="productId" name="productId" />
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit">Get rating</button>
          </form>

          <!-- Loading -->
          <div *ngIf="loading$ | async" class="flex justify-center py-4">
            <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
          </div>

          <!-- Product display -->
          <ng-container *ngIf="product$ | async as product">
            <app-product-card [product]="product"></app-product-card>
          </ng-container>

          <!-- Rating display -->
          <div *ngIf="rating$ | async as rating" class="mt-2 text-gray-700">
            <p>Average: {{ rating.avg_rating }} / 5</p>
            <p>Total votes: {{ rating.count }}</p>
          </div>

        </mat-card>

      </div>
    </div>
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
  }
}
