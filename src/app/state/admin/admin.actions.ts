import { createAction, props } from '@ngrx/store';

export const loadStats = createAction('[Admin] Load Stats');

export const loadStatsSuccess = createAction(
  '[Admin] Load Stats Success',
  props<{ stats: any }>()
);

export const loadStatsFailure = createAction(
  '[Admin] Load Stats Failure',
  props<{ error: string }>()
);
