import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as P from '../state/products/products.actions';
import * as ProductSelectors from '../state/products/products.selectors';

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductsListComponent } from '../components/products-list/products-list.component';
import { Product } from '../../mocks/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ProductsListComponent,
  ],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto space-y-8">

        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
          Products
        </h1>

        <!-- Filters -->
        <mat-card class="p-6 rounded-xl shadow-sm border border-gray-100 bg-white">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <!-- Min Rating -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Minimum Rating</mat-label>
              <input
                matInput
                [(ngModel)]="minRating"
                name="minRating"
                type="number"
                min="0"
                max="5"
                (ngModelChange)="onFiltersChanged()"
              />
            </mat-form-field>

            <!-- Ordering -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Sort by</mat-label>
              <mat-select [(ngModel)]="ordering" name="ordering" (selectionChange)="onFiltersChanged()">
                <mat-option value="-created_at">Newest First</mat-option>
                <mat-option value="created_at">Oldest First</mat-option>
                <mat-option value="-price">Price High → Low</mat-option>
                <mat-option value="price">Price Low → High</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Page Size -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Items per page</mat-label>
              <mat-select [(ngModel)]="pageSize" name="pageSize" (selectionChange)="onFiltersChanged()">
                <mat-option value="5">5 items</mat-option>
                <mat-option value="10">10 items</mat-option>
                <mat-option value="20">20 items</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Reset button -->
          <div class="flex justify-end pt-6">
            <button
              mat-stroked-button
              color="warn"
              class="px-6 py-2 rounded-lg"
              (click)="resetFilters()"
            >
              Reset Filters
            </button>
          </div>
        </mat-card>

        <!-- Loading -->
        <div *ngIf="loading$ | async" class="flex justify-center py-12">
          <mat-progress-spinner mode="indeterminate" diameter="60"></mat-progress-spinner>
        </div>

        <!-- Product list -->
        <app-products-list
          [products]="(list$ | async) || []"
          [loading]="(loading$ | async) ?? false"
        ></app-products-list>

        <!-- Pagination -->
        <div
          *ngIf="totalPages > 1"
          class="flex justify-center items-center gap-4 mt-8"
        >
          <button
            mat-mini-fab
            color="primary"
            (click)="prevPage()"
            [disabled]="page === 1"
          >
            <mat-icon>chevron_left</mat-icon>
          </button>

          <span class="font-medium text-gray-700 text-lg">
            Page {{ page }} / {{ totalPages }}
          </span>

          <button
            mat-mini-fab
            color="primary"
            (click)="nextPage()"
            [disabled]="page === totalPages"
          >
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>

        <!-- Count -->
        <div
          *ngIf="(count$ | async) as count"
          class="text-gray-600 text-center text-sm mt-2"
        >
          Total products: {{ count }}
        </div>

      </div>
    </div>
  `,
})
export class ProductsPageComponent implements OnInit {
  list$!: Observable<Product[]>;
  count$!: Observable<number>;
  loading$!: Observable<boolean>;

  minRating?: number;
  ordering?: string;

  page = 1;
  pageSize = 10;
  totalPages = 1;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit() {
    this.list$ = this.store.select(ProductSelectors.selectProductsList);
    this.count$ = this.store.select(ProductSelectors.selectProductsCount);
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);

    this.count$.subscribe(count => {
      this.totalPages = Math.ceil(count / this.pageSize);
    });

    this.load();
  }

  load(page = this.page, pageSize = this.pageSize) {
    this.page = page;
    this.pageSize = pageSize;

    this.store.dispatch(
      P.loadProducts({
        page: this.page,
        pageSize: this.pageSize,
        minRating: this.minRating,
        ordering: this.ordering
      })
    );
  }

  /** 🔥 Appelé automatiquement à chaque changement de filtre */
  onFiltersChanged() {
    this.page = 1;
    this.load();
  }

  resetFilters() {
    this.minRating = undefined;
    this.ordering = undefined;
    this.page = 1;
    this.pageSize = 10;
    this.load();
  }

  nextPage() {
    if (this.page < this.totalPages) this.load(this.page + 1);
  }

  prevPage() {
    if (this.page > 1) this.load(this.page - 1);
  }
}
