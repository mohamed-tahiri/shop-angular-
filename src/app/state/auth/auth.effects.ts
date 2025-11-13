import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShopApiService } from '../../core/services/shop-api.service';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(ShopApiService);

  login$ = createEffect(() =>
    this.actions$?.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.api.login(username, password).pipe(
          map(tokens => AuthActions.loginSuccess({ access: tokens.access, refresh: tokens.refresh })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$?.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(({ refresh }) =>
        this.api.refresh(refresh).pipe(
          map(r => AuthActions.refreshSuccess({ access: r.access })),
          catchError(error => of(AuthActions.refreshFailure({ error })))
        )
      )
    )
  );
}
