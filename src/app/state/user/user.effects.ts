// store/user/user.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { ShopApiService } from '../../core/services/shop-api.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private api = inject(ShopApiService);

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      tap(() => console.log("➡️ Effect: loadUser started")),
      switchMap(() =>
        this.api.getUser().pipe(
          tap(user => console.log("➡️ API Response", user)),
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => {
            console.error("❌ API ERROR", error);
            return of(UserActions.loadUserFailure({ error }))
          })
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.api.updateUser(user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadOrders),
      switchMap(() =>
        this.api.getOrders().pipe(
          map(orders => UserActions.loadOrdersSuccess({ orders })),
          catchError(error => of(UserActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrderDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadOrderDetail),
      switchMap(({ id }) =>
        this.api.getOrder(id).pipe(
          map(order => UserActions.loadOrderDetailSuccess({ order })),
          catchError(error => of(UserActions.loadOrderDetailFailure({ error })))
        )
      )
    )
  );
}
