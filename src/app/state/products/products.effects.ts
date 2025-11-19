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
}
