import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as P from '../state/products/products.actions';
import { Observable } from 'rxjs';
import * as ProductSelectors from '../state/products/products.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductsListComponent } from '../components/products-list/products-list.component';
import { Product } from '../../mocks/data';

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
    MatProgressSpinnerModule,
    ProductsListComponent
  ],
  template: `
    <div class="p-4 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto space-y-6">

        <h1 class="text-3xl font-bold text-gray-800">Products</h1>

        <!-- Filters -->
        <mat-card class="p-4 space-y-4">
          <form (ngSubmit)="applyFilters()" class="flex flex-wrap gap-4 items-center justify-center">

            <mat-form-field appearance="fill" class="flex-1 min-w-[120px]">
              <mat-label>Min rating</mat-label>
              <input matInput [(ngModel)]="minRating" name="minRating" type="number" />
            </mat-form-field>

            <mat-form-field appearance="fill" class="flex-1 min-w-[120px]">
              <mat-label>Ordering</mat-label>
              <input matInput [(ngModel)]="ordering" name="ordering" placeholder="-created_at" />
            </mat-form-field>

            <mat-form-field appearance="fill" class="flex-1 min-w-[120px]">
              <mat-label>Items per page</mat-label>
              <mat-select [(ngModel)]="pageSize" name="pageSize" (selectionChange)="changePageSize()">
                <mat-option [value]="5">5</mat-option>
                <mat-option [value]="10">10</mat-option>
                <mat-option [value]="20">20</mat-option>
              </mat-select>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit">Apply</button>
          </form>

          <button mat-stroked-button color="accent" class="mt-2" (click)="goToRatingPage()">
            Voir les ratings
          </button>
        </mat-card>

        <!-- Loading -->
        <div *ngIf="loading$ | async" class="flex justify-center py-8">
          <mat-progress-spinner mode="indeterminate" diameter="50" color="accent"></mat-progress-spinner>
        </div>

        <!-- Products List -->
        <app-products-list
          [products]="(list$ | async) || []"
          [loading]="(loading$ | async) ?? false"
        ></app-products-list>

        <!-- Pagination -->
        <div class="flex justify-center gap-2 mt-4" *ngIf="totalPages > 1">
          <button mat-button (click)="prevPage()" [disabled]="page === 1">Prev</button>
          <span>Page {{ page }} / {{ totalPages }}</span>
          <button mat-button (click)="nextPage()" [disabled]="page === totalPages">Next</button>
        </div>

        <!-- Total count -->
        <div *ngIf="(count$ | async) as count" class="text-gray-600 text-sm">
          Total: {{ count }}
        </div>

      </div>
    </div>
  `
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

    // recalculer totalPages à chaque changement de count
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

  applyFilters() {
    this.load(1, this.pageSize); // reset à la première page
  }

  changePageSize() {
    this.page = 1; // reset à la première page
    this.count$.subscribe(count => {
      this.totalPages = Math.ceil(count / this.pageSize);
    });
    this.load(this.page, this.pageSize);
  }

  goToRatingPage() {
    this.router.navigate(['/app/shop/products/rating']);
  }

  nextPage() {
    if (this.page < this.totalPages) this.load(this.page + 1, this.pageSize);
  }

  prevPage() {
    if (this.page > 1) this.load(this.page - 1, this.pageSize);
  }
}
