import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminActions from './admin.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShopApiService } from '../../core/services/shop-api.service';
import { AdminStats } from '../../../mocks/admin';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private api = inject(ShopApiService);

  loadStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadStats),
      mergeMap(() =>
        this.api.getAdminStats().pipe(
          map((stats: AdminStats) => AdminActions.loadStatsSuccess({ stats })),
          catchError(error =>
            of(AdminActions.loadStatsFailure({ error: error?.message || 'Erreur serveur' }))
          )
        )
      )
    )
  );
}
