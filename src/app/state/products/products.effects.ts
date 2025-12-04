import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as P from './products.actions';
import { ShopApiService } from '../../core/services/shop-api.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private api = inject(ShopApiService);

  // Load products
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadProducts),
      switchMap(({ page, pageSize, minRating, ordering }) =>
        this.api.getProducts({ page, page_size: pageSize, min_rating: minRating, ordering }).pipe(
          map(res => P.loadProductsSuccess({ count: res.count, results: res.results, query: { page, pageSize, minRating, ordering } })),
          catchError(error => of(P.loadProductsFailure({ error })))
        )
      )
    )
  );

  // Load single product
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadProduct),
      switchMap(({ id }) =>
        this.api.getProductById(id).pipe(
          map(product => P.loadProductSuccess({ product })),
          catchError(error => of(P.loadProductFailure({ error })))
        )
      )
    )
  );

  // Load rating
  loadRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadRating),
      switchMap(({ id }) =>
        this.api.getRating(id).pipe(
          map(r => P.loadRatingSuccess({ id: r.product_id, avg_rating: r.avg_rating, count: r.count })),
          catchError(error => of(P.loadRatingFailure({ error })))
        )
      )
    )
  );

  // Load reviews
  loadReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadReviews),
      switchMap(({ productId }) =>
        this.api.getReviews(productId).pipe(
          map(reviews => P.loadReviewsSuccess({ productId, reviews })),
          catchError(error => of(P.loadReviewsFailure({ error })))
        )
      )
    )
  );

  // Post review
  postReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.postReview),
      switchMap(({ productId, review }) =>
        this.api.postReview(productId, { value: review.value, comment: review.comment }).pipe(
          map(savedReview => P.postReviewSuccess({ productId, review: savedReview })),
          catchError(error => of(P.postReviewFailure({ error })))
        )
      )
    )
  );
}
