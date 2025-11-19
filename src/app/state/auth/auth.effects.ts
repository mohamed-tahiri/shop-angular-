import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { ShopApiService } from '../../core/services/shop-api.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(ShopApiService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
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
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(({ refresh }) =>
        this.api.refresh(refresh).pipe(
          map(r => AuthActions.refreshSuccess({ access: r.access })),
          catchError(error => of(AuthActions.refreshFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/app/login']))
    ),
    { dispatch: false }
  );
}
