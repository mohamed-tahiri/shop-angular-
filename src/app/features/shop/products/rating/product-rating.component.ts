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

import * as P from '../../../../state/products/products.actions';
import * as ProductSelectors from '../../../../state/products/products.selectors';
import { Product } from '../../../../../mocks/data';
import { AsyncPipe, NgIf } from '@angular/common';
import { PageWrapperComponent } from '../../../../shared/components/UI/page-wrappe/page-wrapper.component';
import { RouterModule } from '@angular/router';

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
    PageWrapperComponent,
    RouterModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './product-rating.component.html'
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
