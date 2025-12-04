import { createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';

export interface AdminState {
  stats: any | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AdminState = {
  stats: null,
  loading: false,
  error: null
};

export const adminReducer = createReducer(
  initialState,

  on(AdminActions.loadStats, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AdminActions.loadStatsSuccess, (state, { stats }) => ({
    ...state,
    stats,
    loading: false
  })),

  on(AdminActions.loadStatsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
