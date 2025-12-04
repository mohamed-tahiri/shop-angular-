import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as P from '../../../state/products/products.actions';
import * as ProductSelectors from '../../../state/products/products.selectors';
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

import { Product } from '../../../../mocks/data';
import { ProductsListComponent } from '../../../shared/components/products-list/products-list.component';
import { PageWrapperComponent } from '../../../shared/components/UI/page-wrappe/page-wrapper.component';

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
    PageWrapperComponent
  ],
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.updateTotalPages();
  }

  resetFilters() {
    this.minRating = undefined;
    this.ordering = undefined;
    this.page = 1;
    this.pageSize = 10;
    this.load();
    this.updateTotalPages();
  }

  updateTotalPages() {
    this.count$.subscribe(count => {
      this.totalPages = Math.ceil(count / this.pageSize);
    });
  }

  nextPage() {
    if (this.page < this.totalPages) this.load(this.page + 1);
  }

  prevPage() {
    if (this.page > 1) this.load(this.page - 1);
  }
}